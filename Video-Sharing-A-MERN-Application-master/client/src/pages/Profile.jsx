// src/pages/Profile.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../redux/userSlice";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  background-color: #f5f5f5;
  border: 4px solid #6495ED;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  width: 500px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
  margin-top: 60px;
  border: 4px solid #6495ED;
`;

const Profiletitle = styled.div`
  margin-left: 90px;
`;

const ProfileContent = styled.div`
  flex: 1;
  text-align: left;
  margin-left: 25px;
`;

const ProfileText = styled.div`
  flex: 1;
  text-align: left;
  font-size: 20px;
  margin-top: 30px;
`;

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchUserData = async () => {
      if (navigator.onLine) {
        if (auth.currentUser) {
          const userRef = doc(db, "users", auth.currentUser.uid);
          try {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              console.log("User document data:", userDoc.data());
              dispatch(setUserProfile(userDoc.data()));
            } else {
              console.log("No such document!");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      } else {
        console.error("Client is offline. Cannot fetch user data.");
      }
    };

    fetchUserData();
  }, [dispatch]);

  console.log("Current user:", user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <ProfileImage
        src={user.img || "default-image-url-here"} // Use user's profile image or a default one
        alt="User profile"
      />
      <ProfileContent>
        <Profiletitle><h2>Profile</h2></Profiletitle>
        <ProfileText>
          <p><strong>Name:</strong> {user.name}</p>
          <br />
          <p><strong>Email:</strong> {user.email}</p>
          <br />
          <p><strong>Subscribers:</strong> {user.subscribers}</p>
        </ProfileText>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default Profile;
