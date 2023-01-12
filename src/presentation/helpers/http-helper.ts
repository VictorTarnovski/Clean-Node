import { HttpResponse } from '../protocols/http'
export const BadRequest = (error: Error): HttpResponse => {
    return {
        statusCode: 400,
        body: error
    }
}