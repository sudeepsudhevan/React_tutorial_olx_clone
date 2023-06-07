import React, { useState,useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { addDoc, collection } from 'firebase/firestore'
import { db,auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword , updateProfile } from 'firebase/auth';
import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { app } = useContext(FirebaseContext);
  
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    console.log(username, email, phone, password);
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      updateProfile(user, {
        displayName: username

      }).then(() => {
        addDoc(collection(db, "users"), {
          id: user.uid,
          username: username,
          phone: phone
          

        }).then(() => {
          navigate('/login');
          console.log("you can login now!");
        }
        ).catch((error) => {
          console.error("Error : ", error);
        }
        );

      });
    });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>navigate('/login')}>Login</a>
      </div>
    </div>
  );
}
