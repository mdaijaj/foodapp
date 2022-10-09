import react from 'react';
import HomeRestaurant from './home';
import AddHotel from './hotel/addhotel';
import Errorpage from './error';
import {Route, Switch} from 'react-router-dom';


const Routing=()=>{
    return(
    <>
    <h1>Men Category</h1>
        <Switch>
        <Route exact path="/">
          <HomeRestaurant/>
        </Route>

        <Route path="/addhotel">
          <AddHotel/>
        </Route>

        <Route>
          <Errorpage />
        </Route>
        </Switch>

    </>
    )
}

export default Routing;