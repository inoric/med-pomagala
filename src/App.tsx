import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Zaduzenje from './Zaduzenje';
import Razduzenje from './Razduzenje';
import Arhiva from './Arhiva';
import Inventar from './Inventar';
import Users from './Users';


function App() {
  return (
    <Router>
        <Switch>
        <Route path="/zaduzenje">
            <Zaduzenje />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/razduzenje">
            <Razduzenje />
          </Route>
          <Route path="/arhiva">
            <Arhiva />
          </Route>
          <Route path="/">
            <Inventar />
          </Route>
        </Switch>
    </Router>
  );
}


export default App;
