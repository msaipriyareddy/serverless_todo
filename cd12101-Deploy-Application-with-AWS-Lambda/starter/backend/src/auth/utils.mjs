// import { decode } from 'jsonwebtoken'

export function getUserId(event) {
  const authorization = event.headers.Authorization || event.headers.authorization
  const split = authorization.split(' ')
  const token = split[1]

  const decodedJwt = decode(token)
  return decodedJwt.sub
}
