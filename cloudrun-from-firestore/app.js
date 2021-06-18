const express = require('express');
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const db = admin.firestore();


const app = express();

app.use(express.json());

app.get('/', async (req, res) => {

    let result = []

    const messagesRef = db.collection('messages');
    const snapshot = await messagesRef.get();
    snapshot.forEach(doc => {
        result.push(doc.data())
        console.log(doc.id, '=>', doc.data());
    });


    console.log(result);
    res.send(result);
});

module.exports = app;