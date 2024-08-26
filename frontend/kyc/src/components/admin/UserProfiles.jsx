import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserProfilesTable from './UserProfilesTable';
import UserProfileForm from './UserProfileForm';

export default function UserProfiles() {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/user/all')
      .then(response => {
        setUserProfiles(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user profiles!', error);
      });
  }, []);

  return (
    <div>
      {/* <UserProfilesTable 
        userProfiles={userProfiles} 
        setUserProfiles={setUserProfiles} 
      /> */}
      <UserProfileForm/>
    </div>
  );
}
