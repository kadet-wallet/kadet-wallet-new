import { Link } from "react-router-dom";
import DefaultLayout from "@/src/components/DefaultLayout";
import SRPLayoutImport from "@/src/components/SRPLayoutImport";
import Filler from "@/src/components/Filler";
import Button from "@/src/components/Button";

const SrpImport = () => {
  return(
  <DefaultLayout>
    <h1>Enter your recovery phrase</h1>
  <SRPLayoutImport startIdx={0}/>
  <Filler flexGrow={1} />
  <div>
    <Link to="/ImportWallet2">
      <Button active={true}>Next</Button>
    </Link>
  </div>
  </DefaultLayout>);
};

export default SrpImport;
