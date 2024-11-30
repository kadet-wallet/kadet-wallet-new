import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSrpIndex } from "@/src/Redux/SrpStateSlice";
import DefaultLayout from "@/src/components/DefaultLayout";
import Button from "@/src/components/Button";
import Filler from "@/src/components/Filler";
import SRPLayoutStatic from "@/src/components/SRPLayoutStatic";

const SRPDisplay2 = () => {
  const dispatch = useDispatch();
  useEffect(()=>{ dispatch(setSrpIndex(12))}, [])
  return (
    <DefaultLayout>
      <div>Here is your SRP:</div>
      <div>
        <SRPLayoutStatic startIdx={12} />
      </div>
      <Filler flexGrow={1} />
      <div>
        <Link to="/SRPTest">
          <Button active={true}>Test SRP</Button>
        </Link>
      </div>
    </DefaultLayout>
  );
};

export default SRPDisplay2;