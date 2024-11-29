// import * as react from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DefaultLayout from "@/src/components/DefaultLayout";
import SRPDropBadge from "@/src/components/SRPDropBadge";
import SRPLayout from "@/src/components/SRPLayout";
import SRPDragBadge from "@/src/components/SRPDragBadge";
import { useDispatch } from "react-redux";
import { setSrpIndex } from "../Redux/SrpStateSlice";
import { useEffect } from "react";
const SRPTest = () => {

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(setSrpIndex(0));
  }, []);

  return (
  <DefaultLayout>
    <DndProvider backend={HTML5Backend} debugMode={true}>
        <div>
          <SRPDragBadge />
        </div>
        <SRPLayout as={SRPDropBadge} />
    </DndProvider>
  </DefaultLayout>
  );
};

export default SRPTest;
