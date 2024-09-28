import './App.css';
import axios from 'axios';
import React, {useState} from 'react';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      console.log("Calling /checkEmail endpoint");
      const emailResponse = await axios.post('http://localhost:5008/checkEmail', {
        email: email
      });
      console.log("Response from /checkEmail endpoint: ", emailResponse);
      if (emailResponse.exists) {
        alert('Email already exists');
        return;
      }
      const registerResponse = await axios.post('http://localhost:5008/registerUser', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      });
      alert('User created');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App happy-monkey-regular">
      <form onSubmit={handleSubmit} id="loginForm" style={{display:"flex", flexDirection:"column", width:"30%", verticalAlign:"center", position: "relative", left:"50%", transform:"translateX(-50%)"}}>
        <label htmlFor="firstName" style={{textAlign:"left"}}>First Name</label>
        <input value={firstName} onChange ={(e) => setFirstName(e.target.value)} placeholder="First Name" id="firstName" autoComplete="firstName" required style={{border:"solid 1px black"}}/>
        <label htmlFor="lastName" style={{textAlign:"left"}}>Last Name</label>
        <input value={lastName} onChange ={(e) => setLastName(e.target.value)} placeholder="Last Name" id="lastName" autoComplete="lastName" required style={{border:"solid 1px black"}}/>
        <label htmlFor="email" style={{textAlign:"left"}}>Email</label>
        <input value={email} onChange ={(e) => setEmail(e.target.value)} placeholder="Email" id="email" autoComplete="email" required style={{border:"solid 1px black"}}/>
        <label htmlFor="password" style={{textAlign:"left"}}>Password</label>
        <input value={password} onChange ={(e) => setPassword(e.target.value)} placeholder="New Password" id="password" required style={{border:"solid 1px black"}}/>
        <label htmlFor="confirmPassword" style={{textAlign:"left"}}>Confirm Password</label>
        <input value={confirmPassword} onChange ={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" id="confirmPassword" required style={{border:"solid 1px black"}}/>
        <button type="submit" value="Submit" style={{border:"solid 1px black", backgroundColor:"pink", color:"white"}}>Submit</button>
      </form>
    </div>
  );
}

export default App;