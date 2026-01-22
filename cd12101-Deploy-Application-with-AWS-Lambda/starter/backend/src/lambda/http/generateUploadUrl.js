import { createLogger } from '../../utils/logger.mjs'
import { getUserId } from '../../auth/utils.mjs'
import { getUploadUrl } from '../../fileStorage/attachmentUtils.mjs'
import { TodosAccess } from '../../dataLayer/todosAccess.mjs'

const logger = createLogger('generateUploadUrl')
const todosAccess = new TodosAccess()

export async function handler(event) {
  try {
    logger.info('Processing generateUploadUrl event', { event })

    const userId = getUserId(event)
    const todoId = event.pathParameters.todoId

    const attachmentUrl = `https://${process.env.ATTACHMENTS_S3_BUCKET}.s3.amazonaws.com/${todoId}`

    await todosAccess.updateAttachmentUrl(userId, todoId, attachmentUrl)

    const uploadUrl = getUploadUrl(todoId)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ uploadUrl })
    }
  } catch (e) {
    logger.error('GenerateUploadUrl failed', { error: e.message })

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ error: 'Internal Server Error' })
    }
  }
}
