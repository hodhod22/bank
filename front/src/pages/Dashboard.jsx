import React, { useEffect, useState } from "react";
import axios from "axios";
import TransferForm from "../components/TransferForm";
import { useSelector } from "react-redux";
import Stripe from "../components/Stripe";
import CurrencyConverter from "./CurrencyConverter";
import LiveCurrencyRates from "../components/LiveCurrencyRates";
import ZarinpalPayment from "./../components/ZarinpalPayment";

const Dashboard = () => {
  const [price, setPrice] = useState(0);
  const [users, setUsers] = useState([]);

  const user1 = useSelector((state) => state.auth.user);
  let response;
  let sender;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        response = await axios.get("http://localhost:5000/api/auth/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error.message);
      }
    };

    fetchUsers();
  }, []);
  const handleChange = (e) => {
    if (e.target.value < 100) {
      setPrice(100);
      localStorage.setItem("thisPrice", 100);
    } else {
      setPrice(e.target.value);
      localStorage.setItem("thisPrice", parseInt(e.target.value));
    }
    sender = users.filter((user) => user.email === user1.email);

    localStorage.setItem("thisAccountnumber", sender[0].accountNumber);
  };
  return (
    <div className="p-3 bg-[#00008B] ">
      <div className="rounded font-bold shadow-inner  shadow-yellow-300 outline-teal-500 outline-4 mb-2 border-[1px] p-6">
        <label className="block text-xl text-[#d65076] text-center" htmlFor="">
          Minimum amount is $100
        </label>
        <input
          className="w-full pl-2  h-[50px] border-blue-700 border-[2px] rounded-lg text-lg text-black"
          type="number"
          onChange={handleChange}
          max="10000"
          min="100"
          defaultValue={0}
        />
        <div className={`${price === 0 ? "disabled text-red-600" : ""}  `}>
          <Stripe orderId={user1?.id} price={price} />
        </div>
      </div>
      <ZarinpalPayment />
      {users.map((user) =>
        user.email === user1?.email ? (
          <ul
            key={user._id}
            className="rounded shadow-inner shadow-yellow-300 bg-[#00008B] w-full text-white text-xl outline-teal-500 outline-4 mb-2 border-[1px]"
          >
            <h1 className="text-2xl font-bold mb-4 text-[#d65076] text-center pt-3">
              Dashboard
            </h1>
            <div className="flex ">
              <li className="p-2 text-[#d65076]">Name</li>
              <li className="p-2">{user.name}</li>
            </div>
            <div className="flex">
              <li className="p-2 text-[#d65076]">Email</li>
              <li className="p-2">{user.email}</li>
            </div>
            <div className="flex">
              <li className="p-2 text-[#d65076]">Account Number</li>
              <li className="p-2">{user.accountNumber}</li>
            </div>
            <div className="flex">
              <li className="p-2 text-[#d65076]">Balance (USD)</li>
              <li className="p-2">{user.balance.USD}</li>
            </div>
            <div className="flex">
              <li className="p-2 text-[#d65076]">Balance (GBP)</li>
              <li className="p-2">{user.balance.GBP}</li>
            </div>
            <div className="flex">
              <li className="p-2 text-[#d65076]">Balance (EUR)</li>
              <li className="p-2">{user.balance.EUR}</li>
            </div>
            <div className="flex">
              <li className="p-2 text-[#d65076]">Balance (IRR)</li>
              <li className="p-2">{user.balance.IRR}</li>
            </div>
          </ul>
        ) : (
          ""
        )
      )}

      <TransferForm />
      <CurrencyConverter />

      <LiveCurrencyRates />
    </div>
  );
};

export default Dashboard;
