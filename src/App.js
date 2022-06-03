import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Register, Navbar, Homepage, Kicks, ForgotPassword, PasswordReset, userInfo } from './components'

function App() {
  const [currentKicks, setCurrentKick] = useState(0);
  const [user, setUser] = useState({});

  const getUser = async()=>{
    const userFound = await userInfo();
    console.log(userFound);
    setUser(userFound);
  }
  useEffect(()=>{
    getUser();
  },[])

  return (
    <Router>
      <div className="App">
        <Navbar user={user}/>
        <div className="main-container">
        {/* <Nav user={user} */}
        <Routes>
          <Route exact path="/" element={<Homepage currentKicks={currentKicks} setCurrentKick={setCurrentKick}/>}/>
          <Route exact path="/kicks" element={<Kicks/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route path="/forgot" element={<ForgotPassword/>}/>
          <Route path="/reset" element={<PasswordReset/>}/>
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
