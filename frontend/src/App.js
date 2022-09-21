import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import Spots from './components/Spots/index'
import SingleSpot from "./components/SingleSpot";
import CreateSpotForm from "./components/CreateSpotForm.js";
import GetSpotsCurrentUser from "./components/Spots/CurrentUserSpots";
import EditSpotForm from "./components/Spots/EditSpotForm";
import Reviews from "./components/Reviews/Reviews";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Spots />
          </Route>
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route path='/spots/current'>
            <GetSpotsCurrentUser />
          </Route>
          <Route exact path='/spots/:spotId/reviews'>
            <Reviews />
          </Route>
          <Route path="/spots/:spotId">
            <SingleSpot />
          </Route>
          <Route path='/spots'>
            <CreateSpotForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
