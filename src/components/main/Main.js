import Home from "../../pages/Home";

import Error from "../extra/Error";
import { Switch, Route } from "react-router-dom";
import SearchResult from "../../pages/SearchResult";
import Artist from "../../pages/artist";
import Album from "../../pages/Album";

function Main() {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={SearchResult} />
        <Route path="/artist/:id" component={Artist} />
        <Route path="/album/:id" component={Album} />
        <Route path="*">
          <Error message={"No route here"} />
        </Route>
      </Switch>
    </main>
  );
}

export default Main;
