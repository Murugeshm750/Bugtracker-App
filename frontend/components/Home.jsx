import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'



const Home = () => {

  //   INITIALIZE VALIDATION USER DETAILS
  const [validateUser, setValidateUser] = useState([]);

  // FUNCTION FOR VALIDATE USER GET ALL DATA FROM DATABASE (USER TABLE)
  async function handleRecoverData() {
    try {
      const response = await axios.get('http://localhost:3000/bugtracker.com/users', {
        method: "GET"
      })
      setValidateUser(response.data.users);
    } catch (error) {
      console.log(error);
    }
  }

  // RENDER USER DATA FROM SCREEN
  useEffect(() => {
    const fetchData = async () => {
      await handleRecoverData();
    }
    fetchData();
  }, []);
  return (
    <div>
      <h1>Welcome to BUG TRACKER site :)</h1>


      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>USER ID</th>
              <th>Name</th>
              <th>EMAIL</th>
              <th>CONTACT</th>
              <th>ROLE</th>
              <th>PASSWORD</th>
            </tr>
          </thead>
          <tbody>
            {validateUser.map((data) => (
              <tr key={data.userId}>
                <td>{data.userId}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.contact}</td>
                <td>{data.role}</td>
                <td>{data.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home