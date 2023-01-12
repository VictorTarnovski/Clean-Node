import { HttpRequest, HttpResponse } from './protocols/http'
import { MissingParamError } from './errors/missing-param-error'
import { OK, BadRequest } from './helpers/http-helper'
import { Controller } from './protocols/controller'
import { EmailValidator } from './protocols/email-validator'
import { InvalidParamError } from './errors/invalid-param-error'
import { ServerError } from './errors/server-error'

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
                    return BadRequest(new MissingParamError(`${fieldValue}`))
                }
            }
            const isValid = this.emailValidator.isValid(httpRequest.body.email)
            if (!isValid) {
                return BadRequest(new InvalidParamError('email'))
            }
            return OK()
        } catch (error){
            return {
                statusCode: 500,
                body: new ServerError
            }
        }
    }
}