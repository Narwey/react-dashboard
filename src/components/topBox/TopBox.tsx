// import "./topBox.scss"
// // import {topDealUsers} from "../../data.ts"





// const TopBox = () => {
//   return (
//     <div className="topBox">
//       <h1>Top Customers</h1>
//       <div className="list">
//         {topDealUsers.map(user=>(
//           <div className="listItem" key={user.id}>
//             <div className="user">
//               <img src={user.img} alt="" />
//               <div className="userTexts">
//                 <span className="username">{user.username}</span>
//                 <span className="email">{user.email}</span>
//               </div>
//             </div>
//             <span className="amount">${user.amount}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default TopBox



// Top customers 

import React, { useState, useEffect } from 'react';
import "./topBox.scss";
// Import axios or fetch as needed

const TopBox = () => {
  const [topDealUsers, setTopDealUsers] = useState([]);

  useEffect(() => {
    // Fetch data from your backend API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/v1/customers'); // Replace with your actual backend endpoint
        const data = await response.json();
        setTopDealUsers(data.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error if fetching fails
      }
    };

    fetchData(); // Invoke the function to fetch data when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once (on mount)

  return (
    <div className="topBox">
      <h1>Top Customers</h1>
      <div className="list">
        {topDealUsers.map((user , index)=>(
          <div className="listItem" key={index}>
            <div className="user">
              <img src={user.img} alt="" />
              <div className="userTexts">
                <span></span>
                <span className="username">{user.firstName} {user.lastName}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
