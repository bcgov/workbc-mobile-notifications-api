import * as express from "express";
import * as messagingService from '../services/messaging.service'

// Send new message
export const sendMessage = async (req: any, res: express.Response) => {
    console.log("POST request received to " + req.get("host") + req.originalUrl);
    console.log("request body: ");
    console.log(req.body);

    try {
        if (req.body.content === "" || req.body.title === "" || req.body.token === "")
            return res.status(400).send("Missing required parameters");

        let dryRun = typeof req.body.dryRun !== "undefined" ? req.body.dryRun : true

        const messageData = {
            token: req.body.token,
            content: req.body.content,
            title: req.body.title,
            dryRun: dryRun,
            data: req.data
        };

        await messagingService.sendMessage(messageData)
        .then((response) => {
            // Response is a message ID string.
            //console.log('Successfully sent message:', response);
            console.log("RESPONSE")
            console.log(response)
            return res.status(200).send({messageID: response});
        })
        .catch((error) => {
            //console.log('Error sending message:', error);
            console.log("ERROR")
            console.log(error)
            return res.status(400).send(error.errorInfo)
        });
        
        
    } catch(e: any) {
        console.log("catching")
        let statusCode: number = e.message;
        if (statusCode == 401){
            console.log("Authentication Error");
            return res.status(401).send();
        }
        else {
            console.log(e);
            return res.status(500).send("Internal Server Error");
        }
    }
};