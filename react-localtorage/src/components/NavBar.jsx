import { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import {FaUser} from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { LOGOUT } from "../actions";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch({type: LOGOUT});
        navigate("/login");
    }
  return (
    <>
      <Navbar bg="light py-3 px-5">
          <Navbar.Brand className="fw-bolder">Crud Application</Navbar.Brand>
          <Nav className="ms-auto">
           <div className="position-relative">
                <span style={{fontSize:"24px", cursor: 'pointer'}} onClick={() => setShow(!show)}><FaUser /></span>
                {show && <span className="position-absolute logout" onClick={() => handleLogout()}>Logout</span>}
           </div>
          </Nav>
      </Navbar>
    </>
  );
};

export default NavBar;