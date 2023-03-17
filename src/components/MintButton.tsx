import React, { useState } from "react";
import { payWithBTC } from "./paymentMethods"; // Import your actual payment methods
import { payWithSOL } from "./payWithSol";
const MintButton = ({ stakedMeerkatNFT, onMint }) => {
  const [paymentMethod, setPaymentMethod] = useState("btc");

  const handleMint = () => {
    if (paymentMethod === "btc") {
      payWithBTC(stakedMeerkatNFT);
    } else if (paymentMethod === "sol") {
      payWithSOL(stakedMeerkatNFT);
    }
    onMint();
  };

  return (
    <div>
      <button
        onClick={handleMint}
        style={{
          background: "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,255,0,1) 50%, rgba(0,0,255,1) 100%)",
          borderRadius: "5px",
          color: "white",
          fontWeight: "bold",
          padding: "10px 20px",
          fontSize: "16px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Mint
      </button>
      <div>
        <label>
          <input
            type="radio"
            value="btc"
            checked={paymentMethod === "btc"}
            onChange={() => setPaymentMethod("btc")}
          />
          Pay with BTC
        </label>
        <label>
          <input
            type="radio"
            value="sol"
            checked={paymentMethod === "sol"}
            onChange={() => setPaymentMethod("sol")}
          />
          Pay with Solana
        </label>
      </div>
    </div>
  );
};

export default MintButton;
