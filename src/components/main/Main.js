import Home from "./Home";
import SearchResult from "./SearchResult";
import { useContext } from "react";
import { AppContext } from "../../App";

function Main() {
  const { showHome } = useContext(AppContext);

  return <main className="main">{showHome ? <Home /> : <SearchResult />}</main>;
}

export default Main;
