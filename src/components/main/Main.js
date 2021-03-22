import Home from "./Home";
import SearchResult from "./SearchResult";
import Error from "../extra/Error";
import { Switch, Route } from "react-router-dom";

function Main() {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={SearchResult} />
        <Route path="*">
          <Error message={"No route here"} />
        </Route>
      </Switch>
    </main>
  );
}

export default Main;
