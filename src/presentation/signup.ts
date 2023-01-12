import { HttpRequest, HttpResponse } from './protocols/http'
import { MissingParamError } from './errors/missing-param-error'
import { BadRequest } from './helpers/http-helper'

export class SignUpController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['name','email','password','passwordConfirmation']
        for (let field in requiredFields) {
            const fieldValue = requiredFields[field];
            if (!httpRequest.body[fieldValue]) {
                return BadRequest(new MissingParamError(`${fieldValue}`))
            }
        }
        return {
            statusCode: 200,
            body: 'Okay message'
        }
    }
}