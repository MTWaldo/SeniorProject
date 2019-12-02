import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export  const subscribeToTopic = functions.https.onCall(
    async (data, context) => {
        await admin.messaging().subscribeToTopic(data.token, data.topic);

        return `subscribed to ${data.topic}`;

    }
);

export const unsubscribeFromTopic = functions.https.onCall(
    async (data, context) => {

        await admin.messaging().unsubscribeFromTopic(data.token, data.topic);
        return `unsubscribed from ${data.topic}`;
    }
);

export const sendOnMessageCreate  = functions.firestore
.document(`message/{messageId}`)
.onCreate(async snapshot => {

    const data = snapshot.data();
    if(data){

    const notification: admin.messaging.Notification = {
        title: 'New Message!',
        body: data.headline
    };
  
    const payload: admin.messaging.Message = {
        notification,
        topic: 'messages'
    };

    return admin.messaging().send(payload)

 
    }
    else{
        return null;
    }    
});

