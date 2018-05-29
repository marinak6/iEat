import * as firebase from 'firebase';
import * as auth from './auth';
    
// initialize firebase
let config = {
    apiKey: "AIzaSyCMmEFOtyY3-JHSYQ4N8a1teWBTb2fQTfw",
    authDomain: "ieat-8d93e.firebaseapp.com",
    databaseURL: "https://ieat-8d93e.firebaseio.com",
    projectId: "ieat-8d93e",
    storageBucket: "ieat-8d93e.appspot.com",
    messagingSenderId: "7989055744"
};

if(!firebase.apps.length){
    firebase.initializeApp(config);
}
//const auth = firebase.auth();
export {
    auth,
    firebase
}