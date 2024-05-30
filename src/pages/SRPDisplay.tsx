import * as react from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/Redux/store";
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

  const srpIndex = useSelector((state: RootState) => state.srpState.srpIndex);

  return (
    <DefaultLayout>
      <div>Here is your SRP:</div>
      <div>
        <SRPLayout as={SRPStaticBadge} />
      </div>
      <Filler flexGrow={1} />
      <div>
        <Link to="/SRPTest">
          <Button active={srpIndex === 12}>Test SRP</Button>
        </Link>
      </div>
    </DefaultLayout>
  );
};

export default SRPDisplay;
