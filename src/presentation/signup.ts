import { HttpRequest, HttpResponse } from './protocols/http'
import { MissingParamError } from './errors/missing-param-error'
import { OK, BadRequest } from './helpers/http-helper'
import { Controller } from './protocols/controller'

export class SignUpController implements Controller {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['name','email','password','passwordConfirmation']
        for (let field in requiredFields) {
            const fieldValue = requiredFields[field];
            if (!httpRequest.body[fieldValue]) {
                return BadRequest(new MissingParamError(`${fieldValue}`))
            }
        }
        return OK()
    }
}