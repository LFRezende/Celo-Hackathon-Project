import React from "react";
import Navbar from "./components/Navbar";
import Button from "./components/Button";
import Box from "./components/Box";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

function App() {
  const [provider, setProvider] = useState(null);
  const [network, setNetwork] = useState("");
  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = ethers.getDefaultProvider();
        setProvider(provider);
      }
    };
    initializeProvider();
    const getNetwork = async () => {
      if (provider) {
        const network = await provider.getNetwork();
        setNetwork(network.name);
      }
    };

    getNetwork();
  }, [provider]);

  return (
    <>
      <Navbar />
      <Button />
      <Box />
      <p>Connected to network:{network}</p>
      <div className="text-5xl">First Project Draft</div>
    </>
  );
}

export default App;
