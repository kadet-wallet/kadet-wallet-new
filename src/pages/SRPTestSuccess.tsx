import { Link } from "react-router-dom";
import DefaultLayout from "@/src/components/DefaultLayout";
import Filler from "@/src/components/Filler";
const SRPTestSuccess = () => {
  return (
    <DefaultLayout>
      <h1>Congratulations</h1>
      <p>Your secure recovery phrases match!</p>
      <Filler flexGrow={1} />
      <div>
        <Link to="/KDADashboard">Dashboard</Link>
      </div>
    </DefaultLayout>
  );
};

export default SRPTestSuccess;
