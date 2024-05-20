import * as react from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCorrectSrp } from "@/src/Redux/SrpStateSlice";
import { generateMnemonic } from "@/src/utils/crypto";
import DefaultLayout from "@/src/components/DefaultLayout";
import Button from "@/src/components/Button";
import Filler from "@/src/components/Filler";
import SRPLayout from "@/src/components/SRPLayout";
import SRPStaticBadge from "@/src/components/SRPStaticBadge";
const SRPDisplay = () => {
  const dispatch = useDispatch();
  react.useEffect(() => {
    const mnemonic = generateMnemonic();
    dispatch(setCorrectSrp(mnemonic.split(" ")));
  }, [dispatch]);

  return (
    <DefaultLayout>
      <div>Here is your SRP:</div>
      <div>
        <SRPLayout as={SRPStaticBadge} />
      </div>
      <Filler flexGrow={1} />
      <div>
        <Link to="/SRPTest">
          <Button active={false}>Test SRP</Button>
        </Link>
      </div>
    </DefaultLayout>
  );
};

export default SRPDisplay;
