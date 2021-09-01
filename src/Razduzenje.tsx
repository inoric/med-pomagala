import { Link } from "react-router-dom";
import { CheckIcon, ChevronLeftIcon, ClipboardCheckIcon, ClipboardListIcon, DotsVerticalIcon, SearchIcon } from "@heroicons/react/outline";
import React from "react";
import ThreeDotDropdown from "./components/ThreeDotDropdown";



const data = [
    {
        id: 0,
        name: "Marko Pekas",
        date: "15/8/2021",
        id_opreme: "KV-01",
        ime_opreme: "Krevet el.",
        br_tel: "063/123-456",
        adresa: "Kralja Petra I Karađorđeva 1",
        preuzeo: "Stipe Miočić"
    },{
        id: 1,
        name: "Ivan Jurić",
        date: "11/8/2021",
        id_opreme: "KV-02",
        ime_opreme: "Krevet el.",
        br_tel: "063/123-456",
        adresa: "Ivan Lisinski 67",
        preuzeo: "Mirko Miočić"
    },{
        id: 2,
        name: "Jurić Brzić",
        date: "01/8/2021",
        id_opreme: "HO-04",
        ime_opreme: "Hodalica",
        br_tel: "063/123-456",
        adresa: "Petrovgrad, Bogu Iza Nogu 69",
        preuzeo: "Goran Miočić"
    }
]





function Razduzenje(){
    const [search, setSearch] = React.useState<string>('')
    const [overlay, setOverlay] = React.useState<string>("none")
    const [id, setId] = React.useState<number>(0)
    function setOverlayData(overlayData: string, id: number){
        setId(id);
        setOverlay(overlayData);
    }

    let date = new Date(Date.now()).toLocaleString().split(',')[0]


    return (
    <div className="w-full flex flex-col min-h-screen">
        <div className="flex w-full items-center p-5">
        <Link to="/" className="flex items-center">
            <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
            <p className="text-gray-500">back</p>
        </Link>
        <div className="flex-1"></div>
        <ClipboardCheckIcon className="h-5 w-5 text-gray-500" />
        </div>
        <div className="w-full pt-15 p-5 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold">Razduženje</h1>
        </div>
        <div className="px-5 pb-3">
            <p className="bg-white relative mt-5 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">ime i prezime</p>
            <div className="border rounded flex items-center">
            <input type="text" className="p-2 pl-3 flex-1 focus:outline-none" onChange={event => setSearch(event.target.value)}></input>
            <SearchIcon className="h-5 w-5 mx-3 text-blue-500" />
            </div>
        </div>
        
        {data.map((person, id) => (
        <div className={(person.name.includes(search))?"":"hidden"}>
            <div className="border-t p-3 flex">
                <div className="w-full flex flex-col items-center ml-4">
                    <div className="flex items-center w-full">
                        <p className="text-lg font-semibold">{person.name}</p>
                        <div className="flex-1"></div>
                        <p className="text-sm text-gray-500">{person.date}</p>
                        
                    </div>
                    <div className="flex items-center w-full">
                        <p>{person.ime_opreme}</p>
                        <div className="flex-1"></div>
                        <p className="text-sm text-gray-500">{person.id_opreme}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <ThreeDotDropdown id={person.id} increment={ (arg: string, arg2: number) => setOverlayData(arg, arg2) } />
                </div>
            </div>
        </div>
        ))}
        
        <div className={`
            bg-white-opacity flex-col absolute w-screen h-screen z-20 p-5 transition-opacity duration-200
            ${overlay==="detalji"?"flex opacity-100":"flex opacity-0 -z-10"}`}>
            <div className="flex-1 transition" onClick={()=>setOverlay("none")}></div>
            <div className="p-5 bg-white rounded shadow transition">
                <div className="flex items-center">
                    <p className="text-lg font-semibold">{data[id].name}</p>
                    <div className="flex-1"></div>
                    <p className="text-sm text-gray-500">{data[id].date}</p>
                </div>
                <div className="flex items-center">
                    <p className="">{data[id].ime_opreme}</p>
                    <div className="flex-1"></div>
                    <p className="text-sm text-gray-500">{data[id].id_opreme}</p>
                </div>
                <div className="flex flex-col">
                    <p className="mt-3">Preuzeo</p>
                    <p className="text-sm">{data[id].preuzeo}</p>
                    <p className="text-sm text-gray-500">{data[id].br_tel}</p>
                    <p className="text-sm text-gray-500">{data[id].adresa}</p>
                </div>
                <div className="shadow rounded p-3 flex items-center mt-3" onClick={() => setOverlay("razduzi")}>
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <p>Razduži</p>
                </div>
            </div>
            <div className="flex-1 transition" onClick={()=>setOverlay("none")}></div>
        </div>



        <div className={`
            bg-white-opacity flex-col absolute w-screen h-screen z-20 p-5 transition-opacity duration-200
            ${overlay==="razduzi"?"flex opacity-100":"flex opacity-0 -z-10"}`}>
            <div className="flex-1 transition" onClick={()=>setOverlay("none")}></div>
            <div className="p-5 bg-white rounded shadow transition">
                <div className="flex items-center">
                    <p className="text-lg font-semibold">{data[id].name}</p>
                    <div className="flex-1"></div>
                    <p className="text-sm text-gray-500">{data[id].date}</p>
                </div>
                <div className="flex items-center">
                    <p className="">{data[id].ime_opreme}</p>
                    <div className="flex-1"></div>
                    <p className="text-sm text-gray-500">{data[id].id_opreme}</p>
                </div>
                <div className="flex flex-col">
                <p className="bg-white mt-2 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">preuzima</p>
                <input type="text" className="p-2 pl-3  border rounded focus:outline-none"></input>

                <p className="bg-white mt-2 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">datum</p>
                <input type="text" className="p-2 pl-3  border rounded focus:outline-none" defaultValue={date} placeholder="dd/mm/yyyy"></input>
                </div>
                <div className="shadow rounded p-3 flex items-center mt-3" onClick={() => setOverlay("razduzi")}>
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <p>Potvrdi</p>
                </div>
            </div>
            <div className="flex-1 transition" onClick={()=>setOverlay("none")}></div>
        </div>

        
    </div>
    );
}

export default Razduzenje;