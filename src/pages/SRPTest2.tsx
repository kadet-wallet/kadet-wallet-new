// import * as react from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DefaultLayout from "@/src/components/DefaultLayout";
import SRPDragBadge from "@/src/components/SRPDragBadge";
import SRPLayoutDrop from "@/src/components/SRPLayoutDrop";
import Filler from "@/src/components/Filler";
import Button from "@/src/components/Button";
import { store, RootState } from "@/src/redux/Store";
import { compareArrays } from "@/src/utils/CompareArrays";
import { resetSrp } from "@/src/utils/ResetSrp";

const SRPTest2 = () => {
  const [valid, setValid] = useState(false);
  let correctSrp = useSelector((state: RootState) => state.srpState.correctSrp);
  let enteredSrp = useSelector((state: RootState) => state.srpState.enteredSrp);

  store.subscribe(() => {
    enteredSrp = store.getState().srpState.enteredSrp;
  });

  useEffect(() => {
    setValid(compareArrays(correctSrp, enteredSrp));
  }, [enteredSrp]);

  return (
    <DndProvider backend={HTML5Backend} debugMode={true}>
      <DefaultLayout>
        <div>
          <SRPDragBadge />
        </div>
        <SRPLayoutDrop startIdx={12} />
        <Filler flexGrow={1} />
        <Link to="/SRPTest">
          <div>
            <Button active={true}>Back</Button>
          </div>
        </Link>
        <div>
          {valid === true && (
            <Link to="/SRPSuccess">
              <Button active={true}>Next</Button>
            </Link>
          )}
          {valid === false && <Button active={false}>Next</Button>}
        </div>
        <div>
          <Button active={true} onClick={resetSrp}>
            Reset
          </Button>
        </div>
      </DefaultLayout>
    </DndProvider>
  );
};

export default SRPTest2;
