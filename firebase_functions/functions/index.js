const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()

//Cloud storage triggers
exports.onArchive = functions.storage.object().onArchive((object) => 
{console.info('onArchive storage');
});

exports.onDelete = functions.storage.object().onDelete((object) => 
{console.info('onDelete storage');
});

exports.onFinalize = functions.storage.object().onFinalize((object) => 
{console.info('onFinalize storage');
});

exports.onMetadataUpdate = functions.storage.object().onMetadataUpdate((object) => 
{console.info('onMetadataUpdate storage');
});
//Realtime Database triggers
exports.addText = functions.data.ref('texts/{textId}').onCreate((snapshot,
     context)=> {console.log('Text was added');
});

exports.updateText = functions.data.ref('texts/{textId}').onUpdate((
    snapshot, context) =>{console.log('Text was updated');
});

exports.deleteText = functions.data.log('texts/{textId}').onDelete((
    snapshot, context) =>{console.log('Text was deleted');
});

exports.changeText = functions.data.log('texts/{mytext}').onWrite((
    snapshot, context) =>{console.log('Text was changed');
});


//Cloud firestore triggers
exports.staffAdded = functions.firestore.document('staff/{staffId}').onCreate((
    snap, context) =>{console.info('A new staff member was added');
})

exports.staffUpdated = functions.firestore.document('staff/{staffId}').onUpdate((
    snap, context) =>{console.info('A staff member was updated');
})

exports.staffDeleted = functions.firestore.document('staff/{staffId}').onDelete((
    snap, context) =>{console.info('A staff member was deleted');
})

exports.staffChanged = functions.firestore.document('staff/{staffId}').onWrite((
    snap, context) =>{console.info('A staff member was changed');
})

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
 
    //  exports.date = functions.https.onRequest((req, res) => {
    //      if(req.method != 'GET'){
    //          return res.status(403).send('Forbidden!');
    //      }
    //     const date = new Date ();
    //     const snapshot = admin.database().ref('/dates').push({now: date.toDateString()});
    //     res.redirect(303, snapshot.ref.toString())
    //     //res.send(date.toDateString());
    // })
