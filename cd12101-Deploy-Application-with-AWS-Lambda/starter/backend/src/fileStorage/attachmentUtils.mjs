import AWS from 'aws-sdk'
import { createLogger } from '../utils/logger.mjs'

const logger = createLogger('attachmentUtils')

const s3 = new AWS.S3({
  signatureVersion: 'v4'
})

const bucketName = process.env.ATTACHMENTS_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION

export function getUploadUrl(todoId) {
  logger.info('Generating upload url', { todoId })

  return s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: todoId,
    Expires: parseInt(urlExpiration)
  })
}

export function getAttachmentUrl(todoId) {
  return `https://${bucketName}.s3.amazonaws.com/${todoId}`
}
