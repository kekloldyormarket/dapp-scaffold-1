
declare global {
  interface Window {
    xnft: any;
  }
}
import type { NextPage } from "next";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <HomeView />
    </div>
  );
};

export default Home;
