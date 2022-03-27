export const optionsSwagger = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gez Api',
      version: '1.0.0',
      description: 'Api for Gez project 0auth2'
    },
    servers: [
      {
        url: 'http://localhost:5000'
      },
      {
        url: 'https://backend-ts-express-oauth2.vercel.app'
      }
    ]
  },
  apis: ['./src/router/*.ts']
}
