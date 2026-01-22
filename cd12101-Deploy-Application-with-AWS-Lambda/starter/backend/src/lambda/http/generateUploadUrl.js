// export function handler(event) {
//   const todoId = event.pathParameters.todoId

//   // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
//   return undefined
// }

import { createAttachmentPresignedUrl } from '../../businessLogic/todos.mjs'
import { getUserId } from '../../auth/utils.mjs'
import { getUploadUrl } from '../../fileStorage/attachmentUtils.mjs'

export async function handler(event) {
  const userId = getUserId(event)
  const todoId = event.pathParameters.todoId

  // update DB with attachment URL
  await createAttachmentPresignedUrl(userId, todoId)

  // generate pre-signed URL
  const uploadUrl = getUploadUrl(todoId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({ uploadUrl })
  }
}
