import { useContext } from "react";
import GlobalContext from "../provider/context/GlobalContext";

const useGlobal = () => useContext(GlobalContext);

export default useGlobal;
