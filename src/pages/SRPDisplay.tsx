import * as react from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCorrectSrp, setSrpIndex } from "@/src/Redux/SrpStateSlice";
import { generateMnemonic } from "@/src/utils/crypto";
import DefaultLayout from "@/src/components/DefaultLayout";
import Button from "@/src/components/Button";
import Filler from "@/src/components/Filler";
import SRPLayoutStatic from "@/src/components/SRPLayoutStatic";

const SRPDisplay = () => {
  const dispatch = useDispatch();

  react.useEffect(() => {
    const mnemonic = generateMnemonic();
    dispatch(setCorrectSrp(mnemonic.split(" ")));
    dispatch(setSrpIndex(0))
  }, [dispatch]);

  //const srpIndex = useSelector((state: RootState) => state.srpState.srpIndex);

  return (
    <DefaultLayout>
      <div>Here is your SRP:</div>
      <div>
        <SRPLayoutStatic startIdx={0} />
      </div>
      <Filler flexGrow={1} />
      <div>
        <Link to="/SRPDisplay2">
          <Button active={true}>Next Screen</Button>
        </Link>
      </div>
    </DefaultLayout>
  );
};

export default SRPDisplay;
