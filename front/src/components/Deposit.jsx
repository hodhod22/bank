import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
const Deposit = () => {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleDeposit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/payments/request-payment",
        {
          amount,
          currency: "USD", // Replace with selected currency
          userId: user.id, // Replace with the logged-in user's ID
        }
      );

      navigate("/confirm?");

      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl; // Redirect to Zarinpal
      } else {
        alert("Failed to initiate payment.");
      }
    } catch (error) {
      console.error("Error in payment request:", error);
      alert("Payment request failed.");
    }
  };

  return (
    <div className="mt-4 mb-5 bg-red-500 text-black">
      <h2>Deposit</h2>
      <input
        className="w-40 h-10 p-2 rounded"
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleDeposit}>Deposit with Zarinpal</button>
    </div>
  );
};

export default Deposit;
