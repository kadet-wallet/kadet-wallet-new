import { HashRouter, Route, Routes } from "react-router-dom";
import StartScreen from "@/src/pages/StartScreen";
import Unlock from "@/src/pages/Unlock";
import CreatePassword from "@/src/pages/CreatePassword";
import SRPIntro from "@/src/pages/SRPIntro";
import SRPDisplay from "@/src/pages/SRPDisplay";
import SRPDisplay2 from "@/src/pages/SRPDisplay2";
import SRPTest from "@/src/pages/SRPTest";
import SRPTest2 from "@/src/pages/SRPTest2";
import SRPTestSuccess from "@/src/pages/SRPSuccess";
import KDADashboard from "@/src/pages/KDADashboard";
import KDATransferInput from "@/src/pages/KDATransferInput";
import KDATransferInProgress from "@/src/pages/KDATransferInProgress";
import SRPImport from "@/src/pages/SRPImport";
import SRPImport2 from "@/src/pages/SRPImport2";

const Routers = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<StartScreen />}></Route>
        <Route path="/Unlock" element={<Unlock />}></Route>
        <Route
          path="/CreatePasswordForSrpCreation"
          element={<CreatePassword nextScreen="/SrpIntro" />}
        ></Route>
        <Route
          path="/CreatePasswordForWalletImport"
          element={<CreatePassword nextScreen="/SrpImport" />}
        ></Route>
        <Route path="/SRPIntro" element={<SRPIntro />}></Route>
        <Route path="/SRPDisplay" element={<SRPDisplay />}></Route>
        <Route path="/SRPDisplay2" element={<SRPDisplay2 />}></Route>

        <Route path="/SRPTest" element={<SRPTest />}></Route>
        <Route path="/SRPTest2" element={<SRPTest2 />}></Route>
        <Route path="/SRPSuccess" element={<SRPTestSuccess />}></Route>
        <Route path="/KDADashboard" element={<KDADashboard />}></Route>
        <Route path="/KDATransferInput" element={<KDATransferInput />}></Route>
        <Route
          path="/KDATransferInProgress"
          element={<KDATransferInProgress />}
        ></Route>
        <Route path="/SRPImport" element={<SRPImport />}></Route>
        <Route path="/SRPImport2" element={<SRPImport2 />}></Route>
      </Routes>
    </HashRouter>
  );
};

export default Routers;
