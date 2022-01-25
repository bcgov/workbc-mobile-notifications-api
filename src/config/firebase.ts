import { initializeApp, cert, App } from "firebase-admin/app";
let serviceAccount = JSON.parse(process.env.GOOGLE_SERVICES as string)
const firebaseApp: App = initializeApp({
    credential: cert(serviceAccount)
  })

module.exports = firebaseApp