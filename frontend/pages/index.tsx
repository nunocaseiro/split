import type { NextPage } from "next";
import Flex from "../components/Primitives/Flex";
import Banner from "../components/Primitives/Banner";

const Home: NextPage = () => {
  return (
    <Flex
      css={{
        alignItems: "start",
        backgroundImage: `url(./background.png)`,
        backgroundColor: "black",
        height: "100vh",
        width: "100vw",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Flex css={{ pl: "$62", pt: "$74" }}>
        <Banner />
      </Flex>
    </Flex>
  );
};

export default Home;
