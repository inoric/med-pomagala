import { PencilIcon, SearchIcon, TrashIcon,  } from "@heroicons/react/outline";
import React from "react";
import MainMenu from "./components/MainMenu";
import ThreeDotUsersDropdown from "./components/ThreeDotUsersDropdown";

const data = [
    {
        id: 0,
        name: "Marko Pekas",
        br_tel: "063/123-456",
        adresa: "Kralja Petra I Karađorđeva 1",
    },{
        id: 1,
        name: "Ivan Jurić",
        br_tel: "063/123-456",
        adresa: "Ivan Lisinski 67",
    },{
        id: 2,
        name: "Jurić Brzić",
        br_tel: "063/123-456",
        adresa: "Petrovgrad, Bogu Iza Nogu 69",
    },
]


export default function Users(){
    const [search, setSearch] = React.useState<string>('')
    const [overlay, setOverlay] = React.useState<string>("none")
    const [id, setId] = React.useState<number>(0)
    function setOverlayData(overlayData: string, id: number){
        setId(id);
        setOverlay(overlayData);
    }

    let date = new Date(Date.now()).toLocaleString().split(',')[0]


    return (
        <div className="flex w-full min-h-screen flex-col">
            <div className="flex w-full items-center p-5">

                <div className="flex-1"></div>
                <MainMenu currentPage="users" />
            </div>
            <div className="w-full pt-15 p-5 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold">Razduženje</h1>
        </div>
        <div className="max-w-xl mx-auto w-full">
            <div className="px-5 pb-3 max-w-md mx-auto">
                <p className="bg-white relative mt-5 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">ime i prezime</p>
                <div className="border rounded flex items-center">
                <input type="text" className="p-2 pl-3 flex-1 focus:outline-none" onChange={event => setSearch(event.target.value)}></input>
                <SearchIcon className="h-5 w-5 mx-3 text-blue-500" />
                </div>
            </div>
            <div className="overflow-y-auto h-full">
                {data.map((person, id) => (
                <div className={(person.name.includes(search))?"":"hidden"}>
                    <div className="border-t p-3 flex">
                        <div className="w-full flex flex-col items-center ml-4">
                            <div className="flex items-center w-full">
                                <p className="text-lg font-semibold">{person.name}</p>
                                <div className="flex-1"></div>
                                
                            </div>
                            <div className="flex items-center w-full">
                                <div className="flex-1"></div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <ThreeDotUsersDropdown id={person.id} increment={ (arg: string, arg2: number) => setOverlayData(arg, arg2) } />
                        </div>
                    </div>
                </div>
                ))}
                <div className="h-big"></div>
            </div>
        </div>
        <div className={`
            bg-white-opacity flex-col fixed w-full h-screen z-20 p-5 transition-opacity duration-200
            ${overlay==="uredi"?"flex opacity-100":"flex opacity-0 -z-10"}`}>
            <div className="flex-1 transition" onClick={()=>setOverlay("none")}></div>
            <div className="flex">
            <div className="md:flex-1" onClick={()=>setOverlay("none")}></div>
            <div className="p-5 bg-white rounded shadow max-w-xl flex-1 transition mx-auto">
                <div className="flex flex-col items-center">
                    <div className="w-full">
                        <p className="bg-white relative mt-5 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">ime i prezime</p>
                        <input type="text" defaultValue={data[id].name} className="border rounded w-full p-2 pl-3 flex-1 focus:outline-none"></input>
                    </div>
                    <div className="w-full">
                        <p className="bg-white relative mt-5 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">broj telefona</p>
                        <input type="text" defaultValue={data[id].br_tel} className="border rounded w-full p-2 pl-3 flex-1 focus:outline-none"></input>
                    </div>
                    <div className="w-full">
                        <p className="bg-white relative mt-5 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">adresa</p>
                        <input type="text" defaultValue={data[id].adresa} className="border rounded w-full p-2 pl-3 flex-1 focus:outline-none"></input>
                    </div>
                </div>
                <div className="shadow rounded p-3 flex items-center mt-3" onClick={() => setOverlay("razduzi")}>
                    <PencilIcon className="h-5 w-5 text-green-500 mr-2" />
                    <p>Spremi Promjene</p>
                </div>
            </div>
            <div className="md:flex-1" onClick={()=>setOverlay("none")}></div>
            </div>
            <div className="flex-1 transition" onClick={()=>setOverlay("none")}></div>
        </div>

        <div className={`
            bg-white-opacity flex-col absolute w-full h-screen z-20 p-5 transition-opacity duration-200
            ${overlay==="izbrisi"?"flex opacity-100":"flex opacity-0 -z-10"}`}>
                <div className="flex-1 transition" onClick={()=>setOverlay("none")}></div>
                <div className="flex">
                <div className="md:flex-1" onClick={()=>setOverlay("none")}></div>
                <div className="p-5 bg-white rounded shadow max-w-xl flex-1 transition mx-auto">
                    <div className="flex items-center">
                        <p className="text-lg font-semibold">UPOZORENJE</p>
                        <div className="flex-1"></div>
                        
                    </div>
                    <p className="text-sm text-gray-500">Da li sigurno želite izbrisat osobu {data[id].name} iz baze?</p>
                    <div className="shadow rounded p-3 flex items-center mt-3">
                        <TrashIcon className="h-5 w-5 text-red-500 mr-2" />
                        <p>Izbriši</p>
                    </div>
                </div>
                <div className="md:flex-1" onClick={()=>setOverlay("none")}></div>
                </div>
                <div className="flex-1 transition" onClick={()=>setOverlay("none")}></div>
            </div>

        </div>
    )
}