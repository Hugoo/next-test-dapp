import type { NextPage } from "next";
import { useState } from "react";
import Web3 from "web3";

import UniversalProfileContract from "@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json";

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

    setSignature(tempSign);
  };

  const verifySignature = async () => {
    const myUniversalProfileContract = new web3.eth.Contract(
      UniversalProfileContract.abi as any,
      address
    );

    const hashedMessage = web3.eth.accounts.hashMessage("hello my friend");

    const MAGIC_VALUE = "0x1626ba7e"; // https://eips.ethereum.org/EIPS/eip-1271

    // if the signature is valid it should return the magic value 0x1626ba7e
    const isValidSignature = await myUniversalProfileContract.methods
      .isValidSignature(hashedMessage, signature)
      .call();

    console.log("isValidSignature", isValidSignature);

    if (isValidSignature === MAGIC_VALUE) {
      console.log("🎉 Log In successful!");
    } else {
      // The EOA which signed the message has no SIGN permission over this UP.
      console.log("😭 Log In failed");
    }
  };

  return (
    <div>
      <h1>Test Web3 sign</h1>
      <div>
        <p>Address: {address}</p>
        <p>Signature: {signature}</p>
        <button onClick={extensionLogin}>Connect</button>
        <button onClick={signMessage}>Sign message</button>
        <button onClick={verifySignature}>Verify Signature</button>
      </div>
    </div>
  );
};

export default Web3Sign;
