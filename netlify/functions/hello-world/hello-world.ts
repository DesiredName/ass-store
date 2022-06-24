import { Handler } from '@netlify/functions'
import { DocumentStore } from 'ravendb'

const store = new DocumentStore('https://a.free.ass-store.ravendb.cloud', 'test');
store.initialize();

export const handler: Handler = async (event, context) => {
  const { name = 'iPhone X' } = event.queryStringParameters || {}
  
  const product = {
    id: name,
    title: name,
    price: 999.99,
    currency: 'USD',
    storage: 64,
    manufacturer: 'Apple',
    in_stock: true,
    last_update: new Date()
  };

  const session = store.openSession();
  await session.store(product, 'products/');
  await session.saveChanges();

  const result = await session.load(`products/${name}`);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: result,
    }),
  }
}
