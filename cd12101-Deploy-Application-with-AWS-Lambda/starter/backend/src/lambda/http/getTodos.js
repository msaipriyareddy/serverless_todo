// import middy from '@middy/core'
// import cors from '@middy/http-cors'
// import { getTodosForUser } from '../../ businessLogic/todos.mjs'
// import {getUserId} from '../utils.mjs'

// export const handler= middy().use(cors({credentials}))
//   // TODO: Get all TODO items for a current user
//   return undefined
// }
import { getTodosForUser } from '../../businessLogic/todos.mjs'
import { getUserId } from '../../auth/utils.mjs'

export async function handler(event) {
  const userId = getUserId(event)
  const items = await getTodosForUser(userId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({ items })
  }
}
