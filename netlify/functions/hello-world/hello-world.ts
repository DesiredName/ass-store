import { Handler } from '@netlify/functions'

export const handler: Handler = async (event, context) => {
  try {
    const { name = 'Pete' } = event.queryStringParameters

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Hello, ${name}!`,
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
