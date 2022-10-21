import type { NextPage } from "next";
import { useEffect } from "react";

import Web3Sign from "../components/Web3Sign";

const Web3: NextPage = () => {
  console.log("I get executed in the browser and the client");

  const isSSR = typeof window === "undefined";
  console.log(isSSR);

  useEffect(() => {
    console.log("I am only being executed in the browser");
  }, []);

  return <div>{!isSSR && <Web3Sign />}</div>;
};

export default Web3;
