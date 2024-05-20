import DefaultLayout from "@/src/components/DefaultLayout";
import Button from "@/src/components/Button";
import Filler from "@/src/components/Filler";
import { Link } from "react-router-dom";

const StartScreen = () => {
  return (
    <DefaultLayout>
      <div>Starting screen</div>
      <Filler flexGrow={2}></Filler>
      <Link to="/Unlock">
        <Button active={true}>Unlock Wallet</Button>
      </Link>
      <Link to="/CreatePasswordForSrpCreation">
        <Button active={true}>Create Wallet</Button>
      </Link>
      <Link to="/CreatePasswordForWalletImport">
        <Button active={true}>Import Wallet</Button>
      </Link>
    </DefaultLayout>
  );
};

export default StartScreen;
