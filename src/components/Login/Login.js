import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';



function Login() {

  const[newUser,setNewUser]= useState(false);
  const [user,setUser] = useState({
    isSignIn : false,
    newUser : false,
    name :'',
    email :'',
    photo :''
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = ()=>{
      handleGoogleSignIn()
      .then(res=> {
        handleResponse(res, true);
      })
  }

  const fbSignIn = ()=>{
    handleFbSignIn()
    .then(res => {
            handleResponse(res, true); 
    })
}

  const signOut =()=>{
    handleSignOut()
    .then(res => {
        handleResponse(res, false);
    })
  }
 
  
const handleResponse = (res, redirect)=>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
        history.replace(from);
    }
  }
  
  


  const handleBlur=(event)=>{
    let isFormValid = true;
    console.log(event.target.name, event.target.value);
    if(event.target.name === 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);

    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if(isFormValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (event) =>{
    if (newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res =>{
        handleResponse(res, true);
      })
    }
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res =>{
        handleResponse(res, true);
      })
    }
    event.preventDefault();
  }

  
  return (
    <div style={{textAlign : 'center'}}>
      {
        user.isSignIn ? <button onClick={signOut}>Sign Out</button>
        : <button onClick={googleSignIn}>Sign In</button>
        
      }
      <br/>
      <button onClick={fbSignIn}>Sign In Using Facebook</button>
      {
        user.isSignIn && <div>
          <p> Welcome, {user.name}</p>
          <p>Your email : {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }
      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange = {()=>setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User SignUp</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Your Name" required/>}
        <br/>
        <input type="text" onBlur={handleBlur} name="email" placeholder="Your Email" required/>
        <br/>
        <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Password" required/>
        <br/>
        <input type="submit" onClick ={handleSubmit} value={newUser ? 'Sign up' : 'Sign In'}/>
      </form>
      <p style={{color:'red'}}>{user.error}</p>
      {
        user.success && <p style={{color:'green'}}>User {newUser ? 'created' : 'Logged In'} Successfully !!</p>
      }
    </div>
  );
}

export default Login;
