import { ChevronDownIcon, ChevronLeftIcon, ChevronUpIcon, ClipboardCheckIcon, CollectionIcon } from "@heroicons/react/outline";
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "./components/Dropdown";
import InventoryDropdown from "./components/InventoryDropdown";


const inventory = [
    {
        name: "Krevet el.",
        codeExample: "KV-00",
        items: [
            {
                code: "KV-01",
                available: true,
            },{
                code: "KV-02",
                available: false,
            },{
                code: "KV-03",
                available: true,
            },{
                code: "KV-04",
                available: true,
            }
        ]
    },{
        name: "Krevet med.",
        codeExample: "KM-00",
        items: [
            {
                code: "KM-01",
                available: true,
            },{
                code: "KM-02",
                available: false,
            },{
                code: "KM-03",
                available: false,
            }
        ]
    }
]



export default function Inventar(){
    const [open, setOpen] = useState<boolean>(false);
    function calcAvailable(item: Array<{code: string, available: boolean}>){
        let available = 0;
        item.forEach((item) => {
            if(item.available) available++;
        });

        return available;
    }
    return(
        <div className="flex w-screen min-h-screen">
            
            <div className={"flex-1 transition-all flex flex-col md:p-10 md:pl-20 overflow-hidden p-5 "}>
            <div className="flex w-full items-center pb-5">
                <Link to="/" className="flex items-center">
                    <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
                    <p className="text-gray-500">back</p>
                </Link>
                <div className="flex-1"></div>
                <CollectionIcon className="h-5 w-5 text-gray-500" />
            </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col w-full">
                        <p className="text-gray-500">Ukupno uređaja u inventaru</p>
                        <div className="flex justify-center p-3 w-full">
                            <p className="text-7xl font-bold py-3">1032</p>
                            <div className="flex-1"></div>
                            <div className="flex items-center md:hidden">
                                <div className="p-2 shadow rounded flex items-center justify-center" onClick={() => setOpen(!open)}>
                                    <PlusIcon className="text-green-500 w-6 h-6" />
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>
                <div className="w-full mt-10">
                    <div className="flex items-center justify-center">
                        <div className="flex flex-col p-2 flex-1">
                            <p className="text-gray-500 text-xs md:text-lg">Medicinski uređaj</p>
                        </div>
                        <p className="flex-1 text-gray-500 text-xs md:text-base">zaduženo</p>
                        <p className="flex-1 text-gray-500 text-xs md:text-base">dostupno</p>
                        <p className=" flex-1 text-gray-500 text-xs md:text-base">ukupno</p>
                        <div className="w-6 h-6"></div>
                    </div>
                    {inventory.map((item, index) => (
                        <InventoryDropdown index={index} item={item} />
                    ))}

                </div>
            </div>

            <div className={"border-l transition-all overflow-hidden  md:w-96 md:p-5 flex flex-col justify-center md:justify-start absolute top-0 bg-white h-screen right-0 md:static " + (open?"w-full p-5":"w-0 p-0")}>
                <p className="text-lg p-2">Dodaj Uređaj</p>
                <div className="">
                    <p className="bg-white relative mt-5 text-xs ml-2 -mb-3 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">medicinski uređaj</p>
                    <Dropdown />
                </div>
                <p className="relative bg-white mt-5 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">kod artikla</p>
                <input type="text" className="p-2 pl-3 w-full border rounded focus:outline-none"></input>
                <div className=" flex rounded shadow w-full p-5 my-3 items-center">
                    <p className=" flex-1 font-semibold">Dodaj u inventar</p>
                    <PlusIcon className="w-5 h-5 text-green-500" />
                </div>
                <div className=" flex rounded shadow w-full p-5 my-3 items-center md:hidden" onClick={() => setOpen(!open)}>
                    <ChevronLeftIcon className="w-5 h-5 text-gray-500 mr-5" />
                    <p className=" flex-1 font-semibold">Nazad</p>
                    
                </div>
            </div>
        </div>
    )
}