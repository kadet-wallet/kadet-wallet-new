import { Link } from "react-router-dom";
import Button from "@/src/components/Button";
import DefaultLayout from "@/src/components/DefaultLayout";

const SRPIntro = () => {
  return (
    <DefaultLayout>
      <div>I am ready to save my Secure Recovery Phrase (SRP)</div>
      <Link to="/SRPDisplay">
        <Button active={true}>Go to SRP</Button>
      </Link>
    </DefaultLayout>
  );
};

export default SRPIntro;
