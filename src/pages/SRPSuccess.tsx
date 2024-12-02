import { useEffect } from "react";
import { Link } from "react-router-dom";
import DefaultLayout from "@/src/components/DefaultLayout";
import Filler from "@/src/components/Filler";
import { saveSRP } from "@/src/utils/SRP";
import Button from "@/src/components/Button";

const SRPTestSuccess = () => {
  useEffect(() => {
    saveSRP();
  });

  return (
    <DefaultLayout>
      <h1>Congratulations</h1>
      <p>Your secure recovery phrase has been accepted!</p>
      <Filler flexGrow={1} />
      <div>
        <Link to="/KDADashboard">
          <Button active={true}>Dashboard</Button>
        </Link>
      </div>
    </DefaultLayout>
  );
};

export default SRPTestSuccess;
