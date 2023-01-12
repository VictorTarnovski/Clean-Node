import { HttpRequest, HttpResponse } from './protocols/http'
import { MissingParamError, InvalidParamError } from './errors'
import { OK, badRequest, serverError } from './helpers/http-helper'
import { Controller } from './protocols/controller'
import { EmailValidator } from './protocols/email-validator'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }
    handle(httpRequest: HttpRequest): HttpResponse {
        try {
            const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
            for (let field in requiredFields) {
                const fieldValue = requiredFields[field];
                if (!httpRequest.body[fieldValue]) {
                    return badRequest(new MissingParamError(`${fieldValue}`))
                }
            }
            const isValid = this.emailValidator.isValid(httpRequest.body.email)
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }
            return OK()
        } catch (error){
            return serverError()
        }
    }
}