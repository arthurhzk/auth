import { ServerError } from '@shared/errors/server-error'
import { UnauthorizedError } from '@shared/errors/unauthorized-error'

export enum HttpData {
  BAD_REQUEST = 'BAD_REQUEST',
}

export const badRequest = (error: Error) => ({
  status: false,
  statusCode: 400,
  body: error,
  data: HttpData.BAD_REQUEST,
})

export const forbidden = (error: Error) => ({
  status: false,
  statusCode: 403,
  body: error,
})

export const unauthorized = () => ({
  status: false,
  statusCode: 401,
  body: new UnauthorizedError(),
})

export const serverError = (error: Error) => ({
  status: false,
  statusCode: 500,
  body: new ServerError(error.stack),
})

export const noContent = () => ({
  status: true,
  statusCode: 204,
  body: null,
})

export const created = (data: any, message: string) => ({
  status: true,
  statusCode: 201,
  body: data,
  message: message,
})

export const ok = (data: any, message: string) => ({
  status: true,
  statusCode: 200,
  body: data,
  message: message,
})
