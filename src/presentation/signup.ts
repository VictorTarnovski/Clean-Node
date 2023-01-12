import { HttpRequest, HttpResponse } from './protocols/http'

export class SignUpController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['name','email','password','passwordConfirmation']
        for (let field in requiredFields) {
            const fieldValue = requiredFields[field];
            if (!httpRequest.body[fieldValue]) {
                return {
                    statusCode: 400,
                    body: new Error(`Missing param: ${fieldValue}`)
                }
            }
        }
        return {
            statusCode: 200,
            body: 'Okay message'
        }
    }
}