import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';

const Login = (props) => {

  const [credentials, setCredentials] = useState({email: "", password: ""});
  let navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password}),
    });
    const json = await response.json();
    // console.log(json);
    if(json.success){
      //redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Logged in Successfully", "success");
      navigate("/");
    }
    else{
      props.showAlert("Invalid Credentials", "danger");
    }
  }

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  
  return (
    <div className="container mt-5">
      <h2 className="text-warning my-2 mb-5">Login to Continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-4">
          <label htmlFor="email" className="form-label"> Email Address </label>
          <input className="form-control" type="email"  id="email" name="email" placeholder="Enter your email address" onChange={onChange} value={credentials.email} aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label"> Password </label>
          <input className="form-control" type="password" name="password" id="password" autoComplete="on" placeholder="Enter your password" onChange={onChange} value={credentials.password}/>
        </div>
        <button type="submit" className="btn" style={{"backgroundColor": "#8430D3", "color":"white"}}>Submit</button>
      </form>
    </div>
  );
};

export default Login;