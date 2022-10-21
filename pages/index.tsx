import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      Hugo's test dapp
      <ul>
        <li>
          <Link href="/ethers">
            <a>Test ethersjs</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
