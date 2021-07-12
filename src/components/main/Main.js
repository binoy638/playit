import Home from "../../pages/Home";
import Error from "../extra/Error";
import { Switch, Route } from "react-router-dom";
import SearchResult from "../../pages/SearchResult";
import Artist from "../../pages/artist";
import Album from "../../pages/Album";
import ProtectedRoute from "../../helper/ProtectedRoute";
import Playlists from "../../pages/Playlists";
import Rooms from "../../pages/Rooms";
import Room from "../../pages/Room";
import Profile from "../../pages/Profile";
import Friends from "../../pages/Friends";

function Main() {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={SearchResult} />
        <Route path="/artist/:id" component={Artist} />
        <Route path="/album/:id" component={Album} />
        <ProtectedRoute path="/library/playlists" component={Playlists} />
        <ProtectedRoute path="/profile" component={Profile} />
        <Route path="/rooms" component={Rooms} />
        <ProtectedRoute path="/room/:id" component={Room} />
        <ProtectedRoute path="/friends" component={Friends} />
        <Route path="*">
          <Error message={"No route here"} />
        </Route>
      </Switch>
    </main>
  );
}

export default Main;
