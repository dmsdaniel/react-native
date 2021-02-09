import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyCaKtxnOdGRPKQYv6Niqiefjdmwc_XNAUA",
    authDomain: "meuapp-58e5f.firebaseapp.com",
    databaseURL: "https://meuapp-58e5f-default-rtdb.firebaseio.com",
    projectId: "meuapp-58e5f",
    storageBucket: "meuapp-58e5f.appspot.com",
    messagingSenderId: "352406089221",
    appId: "1:352406089221:web:9353f61f1876ccf387766c",
    measurementId: "G-TESPJ7395W"
  };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
