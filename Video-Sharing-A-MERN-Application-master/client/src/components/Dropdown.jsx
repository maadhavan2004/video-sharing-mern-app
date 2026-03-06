import React, { useState }from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Container = styled.div`
  position: absolute;
  color: black;
  width: 240px;
  top: 65px; 
  right: 20px; 
  background-color: #00CED1;
  border: 2px solid #00FFFF;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 65px;
  cursor: pointer;
  &:hover {
    background-color: #6495ED;
  }
`;

const Dropdown = ({ setOpen }) => {  
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        navigate("/signin");
        setOpen(false);
      })
      .catch((error) => {
        console.error("Sign out error", error);
      });
  };

  return (
    <Container>
      <Link to="/" style={{ color: "black", textDecoration: "none" }}>
        <Item>
          <HomeRoundedIcon style={{ marginRight: "10px" }} />
          Home
        </Item>
      </Link>
      <Link to="/profile" style={{ color: "black", textDecoration: "none" }}>
        <Item>
          <Person2RoundedIcon style={{ marginRight: "10px" }}/>
            Profile
        </Item>
      </Link>
      
      <Item onClick={handleLogout}>
      <LogoutRoundedIcon style={{ marginRight: "10px" }}/>
        Logout
      </Item>
    </Container>
  );
};

export default Dropdown;
