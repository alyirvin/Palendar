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
    <div className="App happy-monkey-regular" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <form onSubmit={handleSubmit} id="loginForm" style={{ display: "flex", flexDirection: "column", width: "50%", padding: "20px", border: "solid 1px black", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
      <label htmlFor="firstName" style={{ textAlign: "left", marginBottom: "10px" }}>First Name</label>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" id="firstName" autoComplete="firstName" required style={{ border: "solid 1px black", marginBottom: "20px", padding: "10px", borderRadius: "5px" }} />
      <label htmlFor="lastName" style={{ textAlign: "left", marginBottom: "10px" }}>Last Name</label>
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" id="lastName" autoComplete="lastName" required style={{ border: "solid 1px black", marginBottom: "20px", padding: "10px", borderRadius: "5px" }} />
      <label htmlFor="email" style={{ textAlign: "left", marginBottom: "10px" }}>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" id="email" autoComplete="email" required style={{ border: "solid 1px black", marginBottom: "20px", padding: "10px", borderRadius: "5px" }} />
      <label htmlFor="password" style={{ textAlign: "left", marginBottom: "10px" }}>Password</label>
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" id="password" required style={{ border: "solid 1px black", marginBottom: "20px", padding: "10px", borderRadius: "5px" }} />
      <label htmlFor="confirmPassword" style={{ textAlign: "left", marginBottom: "10px" }}>Confirm Password</label>
      <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" id="confirmPassword" required style={{ border: "solid 1px black", marginBottom: "20px", padding: "10px", borderRadius: "5px" }} />
      <button type="submit" value="Submit" style={{ border: "solid 1px black", backgroundColor: "hot pink", color: "white", padding: "10px", borderRadius: "5px", fontFamily: "inherit" }}>Submit</button>
    </form>
  </div>
  );
}

export default App;