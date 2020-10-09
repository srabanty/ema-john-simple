import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';

export const initializeLoginFramework = ()=>{
    if (firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = ()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res => {
      console.log(res.user);
      const {displayName, photoURL, email} = res.user;
      const signInUser = {
        isSignIn : true,
        name : displayName,
        email : email,
        photo : photoURL,
        success : true
      }
      return signInUser
    })
    .catch(err =>{
      console.log(err);
      console.log(err.message);
    })
  }

  export const handleFbSignIn = ()=>{
    var fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      user.success = true;
      return user;
      // ...
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  export const handleSignOut = ()=>{
    return firebase.auth().signOut()
    .then(res => {
      const signedOutUser ={
        isSignIn : false,
        name :'',
        email : '',
        password : '',
        photo : '',
        error :'',
        success : false
      }
      return signedOutUser;
    })
    .catch(err => {

    })
  }

  export const createUserWithEmailAndPassword = (name, email, password)=>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo =res.user;
      newUserInfo.error ='';
      newUserInfo.success = true;
      updateUserName(name);
      console.log(res);
      return newUserInfo;
    })
    .catch(error => {
      // Handle Errors here.
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      // ...
    });
  }

  export const signInWithEmailAndPassword = (email, password)=>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        const newUserInfo =res.user;
        newUserInfo.error ='';
        newUserInfo.success = true;
        return newUserInfo;
      })
      .catch(function(error) {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      });
  }

  const updateUserName = name =>{
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('User name updated successfully');
    }).catch(function(error) {
      console.log(error);
    });
  }
