import { useEffect, useContext } from "react";
import { redirect, Link, Outlet, useNavigation, useLoaderData, Form } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

// Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function action({ request }) {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    alert("Successfully Logged Out");
    console.log("Successfully logged out");
    
    return redirect("/");
  } catch (error) {
    console.error("Error during logout:", error);
    alert("Error during logout. Please try again.");
    return null;
  }
}

// Your component code here (if any)