import './App.css';
// import axios from 'axios';
import React, {useContext, useState} from 'react';
import { GlobalContext } from './context';
import { UserContext } from './context';
import { initialUser } from './datatypes';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Groups from './Groups';

function App() {

  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  const { users, setUsers } = useContext(GlobalContext);
  const [currentUser, setCurrentUser] = useState(initialUser);
  const navigate = useNavigate(); 
  const { setCurrentUser: setGlobalUser } = useContext(UserContext);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [id]: value
    });
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (currentUser.password !== currentUser.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {

      const emailExists = users.some(user => user.email === currentUser.email);
      if (emailExists)
      {
        alert('Email already exists');
        return;
      }

      setUsers([...users, currentUser]);
      alert('User created');
      setGlobalUser(currentUser);
      navigate('/Groups');

    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try
    {
      const person = users.some(user => user.username === currentUser.username && user.password === currentUser.password);
      if (person)
      {
        alert('Login successful');
        setGlobalUser(currentUser);
        navigate('/Groups');
      }
      else
      {
        alert('No person with that username/password');
      }
    }
    catch (error)
    {
      console.error(error);
    }
  };

  const [isSliderLogin, setIsSliderLogin] = useState(false);

  const handleCreateAccountSlide = () => {
    setIsSliderLogin(true);
  };

  const handleLoginSlide = () => {
    setIsSliderLogin(false);
  };

  return (
    <div className="App happy-monkey-regular" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh" }}>
      {/* Title Image */}
      <img 
        src="/Palendar_Logo-removebg-preview.png"  // Replace with your image URL
        //alt="Title"
        style={{ width: "350px", marginBottom: "1px" }} // Adjust width and margin as needed
      />
      <Routes>
        <Route path="/Groups" element={<Groups />} />
        <Route path="/" element={
      <div className="signLog">
        <div className="left">
          <div style={{fontSize: '25pt', textAlign: 'left', width:'70%', marginBottom: '10px', fontWeight: 'bold'}}>WELCOME BACK</div>
          <div style={{fontSize: '20pt', textAlign: 'left', width: '70%'}}>Login to Your Account</div>
            <form id="loginForm" onSubmit={handleLogin}>
              <input value={currentUser.username} onChange={handleInputChange} placeholder="Username" id="username" autoComplete="off" required />
              <input value={currentUser.password} onChange={handleInputChange} placeholder="Password" id="password" autoComplete="off" required />
              <button type="submit" value="Submit">LOGIN</button>
            </form>
        </div>
        <div className="divider"></div>
        <div className="right">
          <div className={`slider ${isSliderLogin ? 'translate' : ''}`}>
            <div id="createAccountMsg" style={{ display: isSliderLogin ? 'none' : 'block'}}>
              <div>Don't have an account?</div>
              <div>Make one now!</div>
              <button onClick={handleCreateAccountSlide}>Create Account</button>
            </div>
            <div id="loginMsg" style={{ display: isSliderLogin ? 'block' : 'none'}}>
              <div>Already have an account?</div>
              <div>Log in to it below!</div>
              <button onClick={handleLoginSlide}>Login</button>
            </div>
          </div>
          <div style={{marginTop: "20px"}}>CREATE AN ACCOUNT</div>
        {/* Form */}
          <form onSubmit={handleCreateAccount} id="createForm">
            <label htmlFor="username">Username</label>
            <input value={currentUser.username} onChange={handleInputChange} placeholder="Username" id="username" autoComplete="off" required />
            
            <label htmlFor="email">Email</label>
            <input value={currentUser.email} onChange={handleInputChange} placeholder="Email" id="email" autoComplete="off" required />
            
            <label htmlFor="password">Password</label>
            <input value={currentUser.password} onChange={handleInputChange} placeholder="New Password" id="password" autoComplete="off" required />
            
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input value={currentUser.confirmPassword} onChange={handleInputChange} placeholder="Confirm Password" id="confirmPassword" autoComplete="off" required />
            
            <button type="submit" value="Submit">CREATE ACCOUNT</button>
          </form>
        </div>
      </div>
        }/>
      </Routes>
    </div>
  );
}

export default App;