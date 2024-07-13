import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

function Home() {
  const [displayBathrooms, setDisplayBathrooms] = useState([]);
  
  // Use an environment variable, with a fallback to localhost for development
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    async function fetchBathrooms() {
      try {
        const response = await fetch(`${API_URL}/bathrooms`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const bathrooms = await response.json();
        setDisplayBathrooms(bathrooms);
      } catch (error) {
        console.error("Error fetching bathrooms:", error);
      }
    }

    fetchBathrooms();
  }, []);

  return (
    <>
      <ul className='ml-10'>
        {displayBathrooms.map(bathroom => (
          <li key={bathroom.id}>
            <h3>{bathroom.name}</h3>
            <p><strong>rating: </strong>{bathroom.rating}</p>
            <p><strong>Address: </strong> {bathroom.address}</p>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  );
}

export default Home;