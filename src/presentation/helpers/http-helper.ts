import { HttpResponse } from '../protocols/http'
import { ServerError } from '../errors/server-error'

export const badRequest = (error: Error): HttpResponse => ({
        statusCode: 400,
        body: error
})

export const serverError = (): HttpResponse => ({
    statusCode: 500,
    body: new ServerError()
})

export const OK = (): HttpResponse => ({
    statusCode: 200,
    body: 'OK'
})

export const created = (createdObject: object): HttpResponse => ({
    statusCode: 201,
    body: createdObject
})