import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'


const APP_USER : string = process.env.APP_USER!
const APP_PASS: string = process.env.APP_PASS!
let users : {[k: string] : any} = {}
users[APP_USER] = APP_PASS
console.log(users)
/*

  const registrationToken = 'token';

const message = {
  data: {
    score: '850',
    time: '2:45'
  },
  notification: {
    body: "Hello from Node",
    title: "Notification"
  },
  token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
getMessaging(firebaseApp).send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
*/

const app = express();
const basicAuth = require('express-basic-auth')
const morgan = require('morgan')

const messaging = require('./routes/messaging.route')

app.use(morgan('[:date] :method :url :status :res[content-length] - :remote-addr - :response-time ms'));
app.set('trust proxy', 'loopback, linklocal, uniquelocal')
app.use(basicAuth({users}))

app.use(express.json({limit: "6mb"}));
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    "form-action": ["'none'"],
    "style-src": ["'none'"],
    "font-src": ["'none'"]
  }
}))

app.use('/messaging', messaging)


var port = process.env.PORT || '8000';
app.listen( port, () => {
  console.log( `server started at :${ port }` );
} );

module.exports = app;

