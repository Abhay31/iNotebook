import React from 'react';
import { Link , useLocation, useNavigate } from 'react-router-dom';


const Navbar = (props) => {

  let navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    props.showAlert("Logged Out SuccesFully", "success");
    navigate("/login");
  }
  let location = useLocation();

  
  return (
    <nav  className="navbar navbar-expand-lg navbar-dark" style={{"backgroundColor": "#1f2937"}}>
        <div  className="container-fluid" style={{"color": "#d8b3fe"}}>
            <Link  className="navbar-brand h1 mb-0" style={{"color": "#d8b3fe"}} to='/' >iNoteBook</Link>
            <button  className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span  className="navbar-toggler-icon"></span>
            </button>
            <div  className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul  className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item"> <Link  className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to='/' style={{"color": "#d8b3fe"}}>Home</Link></li>
                    <li className="nav-item"> <Link  className={`nav-link ${location.pathname==='/about'?"active":""}`} to='/about' style={{"color": "#d8b3fe"}}> About </Link></li>
                </ul>
                {!localStorage.getItem('token') ? <form  className="d-flex" role="search">
                  <Link className="btn btn-outline-light mx-2 cursor-pointer" to="/signup" role="button" style={{"backgroundColor": "#8430D3", "color":"white"}}>SignUp</Link>
                  <Link className="btn btn-outline-light mx-2 cursor-pointer" to="/login" role="button" style={{"backgroundColor": "#8430D3", "color":"white"}}>Login</Link>
                </form> : <div><button className='btn btn-outline-light' style={{"backgroundColor": "#8430D3", "color":"white"}} onClick={handleLogout}>Logout</button> </div>}
            </div>
        </div>
    </nav>
  );
}

export default Navbar;