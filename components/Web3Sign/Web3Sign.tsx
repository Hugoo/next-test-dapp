import type { NextPage } from "next";
import { useState } from "react";
import Web3 from "web3";

const Web3Sign: NextPage = () => {
  const [address, setAddress] = useState("");
  const [signature, setSignature] = useState("");

  // @ts-ignore
  const web3 = new Web3(window.ethereum);

  const extensionLogin = async () => {
    const accountsRequest = await web3.eth.requestAccounts();
    const accounts = await web3.eth.getAccounts();

    const upAddress = accounts[0];

    setAddress(upAddress);
  };

  const signMessage = async () => {
    const tempSign = await web3.eth.sign("hello my friend", address);

    console.log("tempSign", tempSign);

    // setSignature(tempSign);
  };

  return (
    <div>
      <h1>Test Web3 sign</h1>
      <div>
        <p>Address: {address}</p>
        <p>Signature: {signature}</p>
        <button onClick={extensionLogin}>Connect</button>
        <button onClick={signMessage}>Sign message</button>
      </div>
    </div>
  );
};

export default Web3Sign;
