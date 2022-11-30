import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Favicon from "react-favicon";

import Spots from './components/Spots/index'
import SingleSpot from "./components/SingleSpot";
import CreateSpotForm from "./components/CreateSpotForm.js";
import GetSpotsCurrentUser from "./components/Spots/CurrentUserSpots";
import UserReviews from "./components/Reviews/UserReviews";
import CreateReview from "./components/Reviews/CreateReview";
import EditSpotForm from "./components/Spots/EditSpotForm";
import SignupFormPage from "./components/SignupFormPage";
import CreateBookingForm from "./components/Bookings/CreateBooking";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Favicon url='https://drive.google.com/uc?export=view&id=13wJ_PryCVGVqu6OF9kFAc941u0JvNZLm' />
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Spots />
          </Route>
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route path='/reviews/current'>
            <UserReviews />
          </Route>
          <Route path='/spots/current'>
            <GetSpotsCurrentUser />
          </Route>
          <Route path='/spots/:spotId/bookings'>
            <CreateBookingForm />
          </Route>
          <Route exact path='/spots/:spotId/edit'>
            <EditSpotForm />
          </Route>
          <Route exact path='/spots/:spotId/reviews'>
            <CreateReview />
          </Route>
          <Route path="/spots/:spotId">
            <SingleSpot />
          </Route>
          <Route path='/spots'>
            <CreateSpotForm />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
