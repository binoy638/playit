import Home from "../../pages/Home";
import Error from "../extra/Error";
import { Switch, Route } from "react-router-dom";
import SearchResult from "../../pages/SearchResult";
import Artist from "../../pages/artist";
import Album from "../../pages/Album";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import NoAuthRoute from "../../helper/NoAuthRoute";
import ProtectedRoute from "../../helper/ProtectedRoute";
import Playlists from "../../pages/Playlists";

function Main() {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={SearchResult} />
        <Route path="/artist/:id" component={Artist} />
        <Route path="/album/:id" component={Album} />
        <NoAuthRoute path="/signup" component={Register} />
        <NoAuthRoute path="/login" component={Login} />
        <ProtectedRoute path="/library/playlists" component={Playlists} />
        <Route path="*">
          <Error message={"No route here"} />
        </Route>
      </Switch>
    </main>
  );
}

export default Main;
