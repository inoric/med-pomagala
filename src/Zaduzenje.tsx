import React from 'react';
import huuuman from './Humaaans.png';
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon, ChevronLeftIcon, BeakerIcon, CheckCircleIcon, SearchIcon, ClipboardListIcon, PlusIcon } from '@heroicons/react/outline'
import { Dropdown } from './components/Dropdown';
import { Link } from 'react-router-dom';
import { SearchSelector } from './components/SearchSelector';



function Zaduzenje() {
  const [overlay, setOverlay] = useState("none");
  let date = new Date(Date.now()).toLocaleString().split(',')[0]
  return (
  <div className="w-full flex  min-h-screen justify-center">
    <div className="flex flex-col p-5 flex-1">
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
    <div className="flex flex-col md:flex-row max-w-5xl md:min-w-52 md:mx-auto">

    <div className="flex-1 md:p-3">
      <SearchSelector overlay={(arg: string) => setOverlay(arg)} />
    </div>
    <div className="flex flex-col flex-1 p-3">
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
    

    <p className="bg-white relative mt-5 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">preuzima</p>
    <input type="text" className="p-2 pl-3 w-full border rounded focus:outline-none"></input>

    <p className="bg-white relative mt-5 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">datum</p>
    <input type="text" className="p-2 pl-3 w-full border rounded focus:outline-none" defaultValue={date} placeholder="dd/mm/yyyy"></input>


    <div className="p-3-ml-5 w-full mt-auto">
      
    </div>
    </div>
    
    </div>
    <button className="rounded max-w-xl mx-auto mt-3 shadow w-full p-3 text-white z-20 bg-blue-900 font-semibold text-lg active:bg-blue-900 active:text-white">unesi</button>
    </div>


    <div className={`
            bg-white-opacity flex-col fixed top-0 right-0 w-screen h-screen z-20 p-5 transition-opacity duration-200
            ${overlay==="dodaj"?"flex opacity-100":"flex opacity-0 -z-10"}`}>
            <div className="flex-1 transition" onClick={()=>setOverlay("none")}></div>
            <div className="flex">
              <div className="flex-1" onClick={()=>setOverlay("none")}></div>
              <div className="p-5 bg-white rounded shadow transition max-w-xl mx-auto">
                <div className="flex flex-col">
                  <p className="text-lg">Dodaj osobu</p>
                  <div className="flex">
                    <div className="flex-1 w-1/2 flex flex-col pr-1">
                      <p className="relative bg-white mt-2 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">ime</p>
                      <input type="text" className="p-2 pl-3 flex-1 min-w-0 border rounded focus:outline-none"></input>
                    </div>
                    <div className="flex-1 w-1/2 flex flex-col pl-1">
                      <p className="relative bg-white mt-2 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">prezime</p>
                      <input type="text" className="p-2 pl-3 min-w-0 border rounded focus:outline-none"></input>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <p className="relative bg-white mt-2 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">adresa</p>
                    <input type="text" className="p-2 pl-3 min-w-0 border rounded focus:outline-none"></input>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <p className="relative bg-white mt-2 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">br tel</p>
                    <input type="text" className="p-2 pl-3 min-w-0 border rounded focus:outline-none"></input>
                  </div>
                </div>
                <div className="shadow rounded p-3 flex items-center mt-3" onClick={() => setOverlay("razduzi")}>
                      <PlusIcon className="h-5 w-5 text-green-500 mr-2" />
                      <p>Dodaj</p>
                  </div>
                  
              </div>
              <div className="flex-1" onClick={()=>setOverlay("none")}></div>
            </div>
            <div className="flex-1 transition" onClick={()=>setOverlay("none")}></div>
        </div>
        


  </div>
  );
}


export default Zaduzenje;
