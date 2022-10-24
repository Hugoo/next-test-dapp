import type { NextPage } from "next";
import { useState } from "react";
import { ethers, Signer } from "ethers";
import UniversalProfileContract from "@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json";

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

    const signature = await etherProvider.send("eth_sign", [
      address,
      "hello my friend",
    ]);

    console.log("signature", signature);

    setSignature(signature);
  };

  const verifySignature = async () => {
    const myUniversalProfileContract = new ethers.Contract(
      address,
      UniversalProfileContract.abi,
      signer
    );

    const hashedMessage = ethers.utils.hashMessage("hello my friend");

    const isValidSignature = await myUniversalProfileContract.isValidSignature(
      hashedMessage,
      signature
    );

    const MAGIC_VALUE = "0x1626ba7e"; // https://eips.ethereum.org/EIPS/eip-1271

    if (isValidSignature === MAGIC_VALUE) {
      console.log("🎉 Sign-In successful!");
    } else {
      // The EOA which signed the message has no SIGN permission over this UP.
      console.log("😭 Log In failed");
    }
  };

  return (
    <div>
      <h1>Test ethers</h1>
      <div>
        <p>Address: {address}</p>
        <p>Signature: {signature}</p>
        <button onClick={extensionLogin}>Connect</button>
        <button onClick={signMessage}>Sign message</button>
        <button onClick={verifySignature}>Verify signature</button>
      </div>
    </div>
  );
};

export default EthersSign;
