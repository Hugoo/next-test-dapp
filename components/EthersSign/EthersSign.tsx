import type { NextPage } from "next";
import { useState } from "react";
import { ethers, Signer } from "ethers";

const EthersSign: NextPage = () => {
  const [address, setAddress] = useState("");
  const [signature, setSignature] = useState("");
  const [signer, setSigner] = useState<Signer>();

  // @ts-ignore
  const etherProvider = new ethers.providers.Web3Provider(window.ethereum);

  const extensionLogin = async () => {
    const accountsRequest = await etherProvider.send("eth_requestAccounts", []);
    const tempSigner = etherProvider.getSigner();
    setSigner(tempSigner);
    const upAddress = await tempSigner.getAddress();
    setAddress(upAddress);
  };

  const signMessage = async () => {
    if (!signer) {
      return;
    }

    const signatureObject = await etherProvider.send("eth_sign", [
      address,
      "hello my friend",
    ]);

    console.log("signatureObject", signatureObject);

    setSignature(signatureObject.signature);
  };

  return (
    <div>
      <h1>Test ethers</h1>
      <div>
        <p>Address: {address}</p>
        <p>Signature: {signature}</p>
        <button onClick={extensionLogin}>Connect</button>
        <button onClick={signMessage}>Sign message</button>
      </div>
    </div>
  );
};

export default EthersSign;
