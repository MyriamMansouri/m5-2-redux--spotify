import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../action";
import { useDispatch } from "react-redux";
import GlobalStyles from "../../GlobalStyles";
import ArtistRoute from "../ArtistRoute/ArtistRoute";

const DEFAULT_ARTIST_ID = "5IcR3N7QB1j6KBL8eImZ8m";
const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(requestAccessToken());
    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((data) => {
        dispatch(receiveAccessToken(data.access_token));
      })
      .catch((err) => dispatch(receiveAccessTokenError()));
  }, []);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
          </Route>
          <Route path="/artists/:id">
            <ArtistRoute />
          </Route>
        </Switch>
      </Router>
      <GlobalStyles />
    </>
  );
};

export default App;
