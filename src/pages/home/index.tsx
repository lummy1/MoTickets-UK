import HeroBanner from "../../components/HeroBanner";
import Popular from "../../components/Popular";
import TopRated from "../../components/TopRated";
import Trending from "../../components/Trending";
import Offers from "../../components/Offers";
import { ToastContainer } from "react-toastify";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="">
      <HeroBanner />
      <Offers />
      <Trending />
      {/* <Popular />
      <TopRated /> */}
      <ToastContainer />
    </div>
  );
};

export default Home;
