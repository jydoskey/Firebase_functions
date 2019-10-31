const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()

 exports.addPerson = functions.https.onCall((data, context) =>{
     var firstName = data.firstName;
     var lastName = data.lastName;

     return admin.database().ref('/persons').push(
        {
            firstName: firstName,
            lastName: lastName,
            fullName: firstName + " " + lastName
        }
     ).then(() => {
         console.log('New person added');
         return "Ok";
     }).catch((error) => {
        throw new functions.https.HttpsError('unknown',error.message, error);
     })
     })
 
     exports.date = functions.https.onRequest((req, res) => {
        const date = new Date ();
        const snapshot = admin.database().ref('/dates').push({now: date.toDateString()})
        res.send(date.toDateString());
    })
