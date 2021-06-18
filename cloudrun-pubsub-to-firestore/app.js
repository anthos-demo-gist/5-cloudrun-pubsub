const express = require('express');
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const db = admin.firestore();


const {
    toMessagePublishedData,
} = require('@google/events/cloud/pubsub/v1/MessagePublishedData');
const app = express();

app.use(express.json());

app.post('/', async (req, res) => {
    if (!req.body) {
        const errorMessage = 'no Pub/Sub message received';
        res.status(400).send(`Bad Request: ${errorMessage}`);
        console.log(`Bad Request: ${errorMessage}`);
        return;
    }
    if (!req.body.message) {
        const errorMessage = 'invalid Pub/Sub message format';
        res.status(400).send(`Bad Request: ${errorMessage}`);
        console.log(`Bad Request: ${errorMessage}`);
        return;
    }
    // Cast to MessagePublishedEvent for IDE autocompletion
    const pubSubMessage = toMessagePublishedData(req.body);
    const name =
        pubSubMessage.message && pubSubMessage.message.data ?
        Buffer.from(pubSubMessage.message.data, 'base64').toString().trim() :
        'World';

    // write to Firestore
    var datenow = `${new Date().toLocaleDateString()}-${ new Date().toLocaleTimeString()}`
    const docRef = db.collection('messages').doc('latest');

    await docRef.set({
        message: `${name}`,
        time: datenow
    });

    const result = `Hello, ${name}! ID: ${req.get('ce-id') || ''}`;
    console.log(result);
    res.send(result);
});

module.exports = app;