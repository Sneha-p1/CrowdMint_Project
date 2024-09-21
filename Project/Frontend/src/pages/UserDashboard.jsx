import React, { useEffect, useState } from "react";
import UserNav from "../components/UserNav";
import { ethers, BrowserProvider } from "ethers";
import Fundraise from './Fundraise';
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [user, setUser] = useState({ address: "", balance: "", projects: [], totalPledged: 0 });
  const [signer, setSigner] = useState(null); // Add signer state
  const [currentProject, setCurrentProject] = useState(null);


  const navigate = useNavigate(); // To navigate between pages


  const provider = new ethers.BrowserProvider(window.ethereum);

  async function connectToMetamask() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      const signer = await provider.getSigner();
      setSigner(signer); // Set the signer
      console.log("Signer address:", signer.address);
      const balance = await provider.getBalance(account);
      const balanceInEther = ethers.formatEther(balance);
      setUser({
        address: account,
        balance: balanceInEther,
      });
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  }


  // Fetch user data (projects and totalPledged)
  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const response = await fetch("/api/dashboard", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          setUser((prevUser) => ({
            ...prevUser,
            projects: data.projects,
            totalPledged: data.totalPledged,
          }));
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserProjects();
  }, []);

  return (
    <>
      <UserNav />
      <button
        type="submit"
        className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 mt-5 ml-4"
        onClick={connectToMetamask}
      >
        Connect to MetaMask
      </button>

      <div className="mt-[40px] mx-4 my-4 h-screen">
        <h1 className="text-3xl">Account Details</h1>
        <div className="mt-4">
          <h2>Account Address</h2>
          <span id="address" className="font-bold text-xl">
            {user.address ? user.address : "Not Connected"}
          </span>
        </div>
        <div className="mt-4">
          <h2>Account Balance</h2>
          <span id="balance" className="font-bold text-xl">
            {user.balance ? `${user.balance} ETH` : "Not Connected"}
          </span>
        </div>

        {/* Pass the signer to Fundraise */}
        {signer && <Fundraise signer={signer} />}
{/* 
        Donation failed: contract runner does not support sending transactions (operation="sendTransaction", code=UNSUPPORTED_OPERATION, version=6.13.2) */}






      </div>
    </>
  );
};

export default UserDashboard;
