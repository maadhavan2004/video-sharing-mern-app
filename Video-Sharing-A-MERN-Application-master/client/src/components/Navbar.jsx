import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Upload from "./Upload";
import Dropdown from "./Dropdown";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 65px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 50%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin-left: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border: 2px solid #6495ED;
  border-radius: 8px;
  color: #6495ED;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgba(100, 149, 237, 0.1);
  }
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  font-size: 15px;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 8px 13px;
  background-color: transparent;
  border: 2px solid #6495ED;
  color: #6495ED;
  border-radius: 5px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  &:hover {
    background-color: #00FFFF;
    color: black;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  position: relative;
`;

const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #999;
`;

const SearchIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #6495ED;
  }
`;

const StyledSearchIcon = styled(SearchOutlinedIcon)`
  cursor: pointer;
  &:hover {
    color: #00FFFF;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const handleAvatarClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleUploadClick = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchIconContainer onClick={() => navigate(`/search?q=${q}`)}>
              <StyledSearchIcon />
            </SearchIconContainer>
          </Search>
          {currentUser ? (
            <User onClick={handleAvatarClick}>
              <Button onClick={handleUploadClick}>
                <CloudUploadOutlinedIcon />
                Upload Video
              </Button>
              <Avatar src={currentUser?.img || "/default-avatar.png"} />
              {currentUser?.name}
              {dropdownOpen && <Dropdown setOpen={setOpen} />}
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
