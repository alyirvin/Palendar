import './App.css';
// import axios from 'axios';
import React, {useContext, useState, useEffect} from 'react';
import { GlobalContext, UserContext } from './context';
import { initialUser, initialCalendar, initialImage, initialResponse } from './datatypes';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Groups from './Groups';
import Calendar from './Calendar';

function App() {

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

  useEffect(() => {
    const genUsers = [
      {
        ...initialUser,
        username: 'natalie',
        email: 'notero@email.com',
        password: 'password',
        calendars: [
          {
            ...initialCalendar,
            name: 'Interns',
            desc: 'For the interns at the company',
            pass: 'intern',
            images: [
              {
                ...initialImage,
                year: 2024,
                month: 9,
                day: 28,
                url: 'https://example.com/image1.jpg',
                responses: [
                  {
                    ...initialResponse,
                    user: 'natalie',
                    response: 'Great image!'
                  }
                ]
              },
              {
                ...initialImage,
                year: 2024,
                month: 9,
                day: 29,
                url: 'https://example.com/image2.jpg',
                responses: [
                  {
                    ...initialResponse,
                    user: 'phoebe',
                    response: 'Nice!'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        ...initialUser,
        username: 'phoebe',
        email: 'pcollins@email.com',
        password: 'password',
        calendars: [
          {
            ...initialCalendar,
            name: 'Dataaa',
            desc: 'Only super cool data scientists allowed',
            pass: '',
            images: [
              {
                ...initialImage,
                year: 2024,
                month: 9,
                day: 27,
                url: 'https://example.com/image3.jpg',
                responses: [
                  {
                    ...initialResponse,
                    user: 'alysha',
                    response: 'Interesting!'
                  }
                ]
              },
              {
                ...initialImage,
                year: 2024,
                month: 9,
                day: 29,
                url: 'https://example.com/image4.jpg',
                responses: [
                  {
                    ...initialResponse,
                    user: 'michael',
                    response: 'FOOD! FOOD! FOOD!'
                  },
                  {
                    ...initialResponse,
                    user: 'kyla',
                    response: 'Went to the aquarium, saw some eels. ew.'
                  },
                  {
                    ...initialResponse,
                    user: 'sophia',
                    response: 'Boston birthday party!!!!!!!!!!! LFG!'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        ...initialUser,
        username: 'alysha',
        email: 'airvin@email.com',
        password: 'password',
        calendars: [
          {
            ...initialCalendar,
            name: 'GradGrad',
            desc: 'Graduates ONLY',
            pass: 'grad',
            images: [
              {
                ...initialImage,
                year: 2024,
                month: 9,
                day: 4,
                url: 'https://example.com/image5.jpg',
                responses: [
                  {
                    ...initialResponse,
                    user: 'phoebe',
                    response: 'Amazing!'
                  }
                ]
              },
            ]
          }
        ]
      }
    ];

    setUsers(genUsers);
    console.log(users);
  }, []);

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
        const you = users.find(user => user.username === currentUser.username);
        setGlobalUser(you);
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

  // NATALIE HANDLER HERE
  const handleNatButton = async (e) => {
    e.preventDefault();

    try {
      navigate('/Calendar');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App happy-monkey-regular" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh" }}>
      {/* Title Image */}
      <img 
        // src="/Palendar_Logo-removebg-preview.png"  // Replace with your image URL
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
      {/* </Routes>
      <Routes> */}
        <Route path="/Calendar" element={<Calendar />} />
        <Route path="/" element={
        <div>
          <button onClick={handleNatButton}>BUTTON FOR NATALIE</button>
        </div>
        }/>
      </Routes>
    </div>
  );
}

export default App;