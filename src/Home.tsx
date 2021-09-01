import React from 'react';
import huuuman from './Humaaans.png';
import huuuman2 from './Humaaans2.png';
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon, ChevronLeftIcon, BeakerIcon, CheckCircleIcon, SearchIcon, ClipboardCheckIcon, ClipboardListIcon, ArchiveIcon, CollectionIcon } from '@heroicons/react/outline'
import { Dropdown } from './components/Dropdown';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Zaduzenje from './Zaduzenje';
import Razduzenje from './Razduzenje';


function Home() {
  return (
    <div className="w-full flex justify-center p-5 flex-col min-h-screen">
        <img className="w-full h-64 bg-huuuman object-contain" src={huuuman2}></img>

        <Link to="/zaduzenje" className="p-3 my-2 py-5 rounded shadow">
            <ClipboardListIcon className="m-2 w-7 h-7 text-gray-900" />
            <p className="text-xl m-2 mb-0">Zaduženje</p>
            <p className="text-base m-2 mt-0">Ovdje se zadužuju medicinska pomagala</p>
        </Link>
        <Link to="/razduzenje" className="p-3 my-2 py-5 rounded shadow">
            <ClipboardCheckIcon className="m-2 w-7 h-7 text-gray-900" />
            <p className="text-xl m-2 mb-0">Razduženje</p>
            <p className="text-base m-2 mt-0">Ovdje se razdužuju medicinska pomagala</p>
        </Link>
        <Link to="/inventar" className="p-3 my-2 py-5 rounded shadow">
            <CollectionIcon className="m-2 w-7 h-7 text-gray-900" />
            <p className="text-xl m-2 mb-0">Inventar</p>
            <p className="text-base m-2 mt-0">Pregled inventara</p>
        </Link>
        <Link to="/arhiva" className="p-3 my-2 py-5 rounded shadow">
            <ArchiveIcon className="m-2 w-7 h-7 text-gray-900" />
            <p className="text-xl m-2 mb-0">Arhiva</p>
            <p className="text-base m-2 mt-0">Pregled svih dosadašnjih zaduženja</p>
        </Link>
    </div>
  );
}


export default Home;
