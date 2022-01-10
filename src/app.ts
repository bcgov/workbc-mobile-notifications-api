import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'

import { initializeApp, cert, App } from "firebase-admin/app";
import {getMessaging} from "firebase-admin/messaging"

let serviceAccount = JSON.parse(process.env.GOOGLE_SERVICES as string)

const firebaseApp: App = initializeApp({
    credential: cert(serviceAccount)
  })

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

var app = express();

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



var port = process.env.PORT || '8000';
app.listen( port, () => {
  console.log( `server started at :${ port }` );
} );

module.exports = app;
