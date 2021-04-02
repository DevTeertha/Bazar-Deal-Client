import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './FirebaseConfig';
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
export const signInWithGoogle = () => {
    const google = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(google)
        .then((result) => {
           return result.user;
        }).catch((error) => {
            const errorMessage = error.message;
            return errorMessage;
        });
}

export const signOut = () =>{
    return firebase.auth().signOut().then((res) => {
        return res;
      }).catch((error) => {
        return error;
      });
}