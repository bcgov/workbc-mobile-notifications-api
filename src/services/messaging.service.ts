import { getMessaging } from "firebase-admin/messaging";
const firebaseApp = require("../config/firebase");

type MessagePayload = {
  token: string;
  content: string;
  title: string;
  dryRun: boolean;
  data: Record<string, string>;
};

export const sendMessage = async (payload: MessagePayload): Promise<string> => {
  try {
    const { token, content, title, dryRun, data } = payload;

    const message = {
      notification: {
        body: content,
        title: title,
      },
      token: token,
      data: {
        ...data,
        ...(data && 'props' in data && { props: JSON.stringify(data.props) }),
      },
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    const resp = getMessaging(firebaseApp).send(message, dryRun);
    //console.log(resp)
    return resp;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
