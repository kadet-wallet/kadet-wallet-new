import { Link } from "react-router-dom";
import DefaultLayout from "@/src/components/DefaultLayout";
import SRPLayoutImport from "@/src/components/SRPLayoutImport";
import Filler from "@/src/components/Filler";
import Button from "@/src/components/Button";
import { saveSRP } from "@/src/utils/SRP";

const SRPImport2 = () => {
  return (
    <DefaultLayout>
      <div>
        <h1>Enter your recovery phrase</h1>
      </div>
      <SRPLayoutImport startIdx={12} />
      <Filler flexGrow={1} />
      <div>
        <Link to="/KDADashboard">
          <Button active={true} onClick={saveSRP}>
            Next
          </Button>
        </Link>
      </div>
    </DefaultLayout>
  );
};

export default SRPImport2;
