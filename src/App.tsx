import React from 'react';
import huuuman from './Huuumans.png';
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon, ChevronLeftIcon, BeakerIcon, CheckCircleIcon, SearchIcon } from '@heroicons/react/outline'
import { Dropdown } from './components/Dropdown';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Zaduzenje from './Zaduzenje';
import Razduzenje from './Razduzenje';
import Home from './Home';
import Arhiva from './Arhiva';
import Inventar from './Inventar';


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/zaduzenje">
            <Zaduzenje />
          </Route>
          <Route path="/razduzenje">
            <Razduzenje />
          </Route>
          <Route path="/arhiva">
            <Arhiva />
          </Route>
          <Route path="/inventar">
            <Inventar />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}


export default App;
