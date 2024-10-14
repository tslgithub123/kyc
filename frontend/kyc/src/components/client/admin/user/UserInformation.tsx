import axios from "axios";
import { useEffect, useState } from "react";

export default function UserInformation(id: any) {
  const[userData, setUserData] = useState<any>([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/user/${id}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }, [id]);
    
    return (
      <div>
        {JSON.stringify(id)}
        {/* <AuthCard isRegistered={true} userType={data.designation} form={data[0]}/> */}
      </div>
    );}
