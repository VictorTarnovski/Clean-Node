import { HttpRequest, HttpResponse } from './protocols/http'
import { MissingParamError } from './errors/missing-param-error'

export class SignUpController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['name','email','password','passwordConfirmation']
        for (let field in requiredFields) {
            const fieldValue = requiredFields[field];
            if (!httpRequest.body[fieldValue]) {
                return {
                    statusCode: 400,
                    body: new MissingParamError(`${fieldValue}`)
                }
            }
        }
        return {
            statusCode: 200,
            body: 'Okay message'
        }
    }
}