import Home from "./Home";
import SearchResult from "./SearchResult";
// import { useContext } from "react";
// import { AppContext } from "../../App";
// import Error from "../extra/Error";
import { Switch, Route } from "react-router-dom";

function Main() {
  return (
    <Switch>
      <main className="main">
        <Route exact path="/" component={Home} />
        <Route path="/search" component={SearchResult} />
        {/* <Route component={Error} /> */}
      </main>
    </Switch>
  );
}

export default Main;
