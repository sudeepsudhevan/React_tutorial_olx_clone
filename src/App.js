import React,{useEffect,useContext} from 'react';
import './App.css';
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import { AuthContext } from './store/Context';


/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';


function App() {
  const {setUser} = useContext(AuthContext);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    }
    )
  }) 

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          
        </Routes>
       

      
      </Router> 
    </div>
  );
}

export default App;
