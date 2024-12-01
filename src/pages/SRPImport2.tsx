import { Link } from "react-router-dom";
import DefaultLayout from "@/src/components/DefaultLayout";
import SRPLayoutImport from "@/src/components/SRPLayoutImport";
import Filler from "@/src/components/Filler";
import Button from "@/src/components/Button";
import { handleKeyCreation } from "@/src/utils/KeyCreation";

const SrpImport2 = () => {
  return (
    <DefaultLayout>
      <div>
        <h1>Enter your recovery phrase</h1>
      </div>
      <SRPLayoutImport startIdx={12} />
      <Filler flexGrow={1} />
      <div>
        <Link to="/KDADashboard">
          <Button active={true} onClick={handleKeyCreation}>
            Next
          </Button>
        </Link>
      </div>
    </DefaultLayout>
  );
};

export default SrpImport2;
