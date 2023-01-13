import { HttpRequest, HttpResponse, Controller, EmailValidator } from './protocols'
import { MissingParamError, InvalidParamError } from './errors'
import { OK, badRequest, serverError } from './helpers/http-helper'

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
            if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
                return badRequest(new InvalidParamError('passwordConfirmation'))
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