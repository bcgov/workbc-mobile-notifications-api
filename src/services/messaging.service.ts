import {getMessaging} from "firebase-admin/messaging"
const firebaseApp = require("../config/firebase")

export const sendMessage = async (token: string, content: string, title: string, dryRun: boolean): Promise<any> => {
    try {
        
        const message = {
            notification: {
                body: content,
                title: title
            },
            token: token
        }
        // Send a message to the device corresponding to the provided
        // registration token.
        const resp = getMessaging(firebaseApp).send(message, dryRun)
        //console.log(resp)
        return resp

    } catch (error: any) {
        console.log(error)
        throw new Error(error)
    }
}