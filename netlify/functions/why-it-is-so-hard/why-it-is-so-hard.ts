import { Handler } from '@netlify/functions'

export const handler: Handler = async (event, context) => {
  try {
    const { name = 'stranger' } = event.queryStringParameters || {}

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Why it is so hard, ${name}?`,
      }),
    }
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Oh my...',
      }),
    }
  }
}
