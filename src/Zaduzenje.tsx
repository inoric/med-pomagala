import React from 'react';
import huuuman from './Humaaans.png';
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon, ChevronLeftIcon, BeakerIcon, CheckCircleIcon, SearchIcon, ClipboardListIcon } from '@heroicons/react/outline'
import { Dropdown } from './components/Dropdown';
import { Link } from 'react-router-dom';
import { SearchSelector } from './components/SearchSelector';



function Zaduzenje() {
  let date = new Date(Date.now()).toLocaleString().split(',')[0]
  return (
  <div className="w-full flex justify-center p-5 flex-col min-h-screen">
    <div className="flex w-full items-center">
    <Link to="/" className="flex items-center">
        <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
        <p className="text-gray-500">back</p>
      </Link>
      <div className="flex-1"></div>
      <ClipboardListIcon className="h-5 w-5 text-gray-500" />
    </div>
    <img className="w-full h-40 bg-huuuman object-contain" src={huuuman}></img>
    <div className="w-full pt-15 p-5 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold">Zaduzenje</h1>
    </div>

    <SearchSelector />

    <div className="w-full flex">
      <div className="flex-1 mr-2">
        <p className="bg-white relative mt-5 text-xs ml-2 -mb-3 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">medicinski uređaj</p>
        <Dropdown />
      </div>
  
      <div className="w-32">
        <p className="bg-white mt-5 relative text-xs ml-2 -mb-3 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">kod artikla</p>
        <Dropdown />
      </div>
    </div>
    

    <p className="bg-white mt-5 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">preuzima</p>
    <input type="text" className="p-2 pl-3  border rounded focus:outline-none"></input>

    <p className="bg-white mt-5 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">datum</p>
    <input type="text" className="p-2 pl-3  border rounded focus:outline-none" defaultValue={date} placeholder="dd/mm/yyyy"></input>


    <div className="p-3-ml-5 w-full mt-auto">
      <button className="rounded mt-3 shadow w-full p-3 text-white z-20 bg-blue-900 font-semibold text-lg active:bg-blue-900 active:text-white">unesi</button>
    </div>

  </div>
  );
}


export default Zaduzenje;
