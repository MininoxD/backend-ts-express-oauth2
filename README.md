# backend-ts-express-oauth2

Para poder usar el proyecto se va requerir las siguientes varibles de entorno:

* NODE_ENV --> 'development' o 'Produccion'
* URL_MAIL --> 'Url de la pagina a la cual redirigir cuando se confirme el email'

* CLIENT_ID_GOOGLE --> 'Clave de google 0auth2'
* URL_MAILCLIENT_SECRET_GOOGLE --> 'Cliente Secreto de google 0auth2'

* FACEBOOK_APP_ID --> 'Clave app de Facebook Developer'
* FACEBOOK_APP_SECRET='Clave secrea de la app de Facebook Developer'

* JWT_SECRET --> 'Palabra clave para el JWT'

* SENDGRID_API_KEY -->'Api de Key de Sendgrid para enviar Email'

* TWILIO_ACCOUNT_SID --> 'SID DE Twillio la cual servira para el envio de SMS'
* TWILIO_AUTH_TOKEN --> 'Token de Twillio'
* TWILIO_NUMBER --> 'El numero que proporciona Twillio'

* DATABASE_URL -->'URL de conexion de la base de datos Mongodb'

# Scrips para poder iniciar

* npm install --> 'Para instalar todas la dependencias'
* npm run dev --> 'Para ejecutar el proyecto en local'
* npm run build --> 'Para comiplar el proyecto'

# Cosas a revisar si se reuqiere hacer modififacones 

* Revisar la documentacion de [prisma](https://www.prisma.io/)
* Revisar la documentacion de [sendgrid](https://app.sendgrid.com/)
* Revisar la documentacion de [twilio](https://www.twilio.com/docs/libraries/node)