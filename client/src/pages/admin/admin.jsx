import React, { useEffect, useState } from "react";
import "./admin.css";




const Admin = () => {
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/user", {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData")
        setAllData(data);

      });
  }, []);

  const deleteUser = async (e) => {
    e.preventDefault();
    const userId = e.target.id;
    try {
      const response = await fetch(`http://localhost:5000/user/${userId}`, {
        method: 'DELETE'
      });
      if (response.status === 200) {
        const data = await response.json();
        alert('User deleted successfully:', data);
        window.location.reload();
      }
      else {

        alert("operation failed")
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }


  return (
    <div className="Auth">
      <div className="profile">
        <div className="a-right">

          <h3 style={{textAlign:"center", fontSize:"35px",paddingTop:"20px"}}>Welcome Admin</h3>
          {/* <table className="Profile">
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Button</th>
            </tr>
            {allData.map(user => {
              return(
              <tr key={user._id}>
                <td>{user.firstname}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
              );
            }
            )}
          </table> */}
          <table className="usertable">
            <tr className="tableHead">
              <th>name</th>
              <th>Username</th>
              <th>email</th>
              <th></th>
            </tr>


            {
              allData.map(user => {
                return (
                  <tr key={user._id}>
                    <td>{user.firstname}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td><button className="button a-button" id={user._id} onClick={deleteUser}>delete</button></td>
                  </tr>
                );
              })
            }
          </table>
        </div>


      </div>
    </div >
  );
};

export default Admin;
