import { Handler } from '@netlify/functions'
import { DocumentStore } from 'ravendb'
import * as fs from 'fs'

const store = new DocumentStore('https://a.free.ass-store.ravendb.cloud', 'test', {
  certificate: fs.readFileSync('certificate.pfx'),
  password: '4FE45E96448CCD2D830D5C1E98A306D',
  type: 'pfx'
});
store.initialize();

export const handler: Handler = async (event, context) => {
  const { name = 'iPhone X' + new Date() } = event.queryStringParameters || {}
  
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
  await session.store(product, `products/${name}`);
  await session.saveChanges();

  const result = await session.load(`products/${name}`);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: result,
    }),
  }
}
