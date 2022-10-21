import type { NextPage } from "next";
import { useEffect } from "react";

import EthersSign from "../components/EthersSign";

const Ethers: NextPage = () => {
  console.log("I get executed in the browser and the client");

  const isSSR = typeof window === "undefined";
  console.log(isSSR);

  useEffect(() => {
    console.log("I am only being executed in the browser");
  }, []);

  return <div>{!isSSR && <EthersSign />}</div>;
};

export default Ethers;
