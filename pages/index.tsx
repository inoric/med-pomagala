import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import additem from "./api/additem";
import { Dropdown } from "../components/Dropdown";
import InventoryDropdown from "../components/InventoryDropdown";
import MainMenu from "../components/MainMenu";


interface Inventory {
    name: string;
    items:
        {
            code: string;
            available: boolean;
        }[]
}

async function getInventory(): Promise<{fullInventory : Inventory[]}> {
    const response = await fetch('/api/getinventory', {
        method: 'GET'
    });
    if (!response.ok){
      throw new Error('Failed to fetch.' + response.statusText);
    }
    return await response.json();
}

async function getItems(): Promise<{id: number, name: string}[]> {
    const response = await fetch('/api/getitems', {
        method: 'GET'
    });
    if (!response.ok){
      throw new Error('Failed to fetch.' + response.statusText);
    }
    return await response.json();
}

async function submit(item: {itemId: number, itemName: string, inventoryCode: string}) {
    const response = await fetch('/api/additem', {
        method: 'POST',
        body: JSON.stringify(item),
    });
    if (!response.ok){
      return new Error('Failed to fetch.' + response.statusText);
    }
    return await response.json();
}
async function remove(id: string) {
    const response = await fetch('/api/removeinventory', {
        method: 'POST',
        body: JSON.stringify({id: id}),
    });
    if (!response.ok){
      return new Error('Failed to fetch.' + response.statusText);
    }
    return await response.json();
}
export default function Inventar(){
    const [open, setOpen] = useState<boolean>(false);
    const [todelete, setTodelete] = useState<string>("none");
    const [newitem, setNewitem] = useState<boolean>(false);

    const [inventoryItems, setInventoryItems] = useState<Inventory[]>([]);
    const [dropdownOptions, setDropdownOptions] = useState<{id: number, name: string, available: boolean}[]>([]);
    const [uredaj, setUredaj] = useState<{itemId: number, itemName: string, inventoryCode: string}>({itemId: 0, itemName: "", inventoryCode: ""})

    useEffect(() => {
        getItems().then(data => {
            for (let i = 0; i < data.length; i++) {
                setDropdownOptions(prev => [...prev, {id: data[i].id, name: data[i].name, available: true}])
            }
            if(uredaj.itemName === ""){
            setUredaj({ ...uredaj, ["itemId"]: data[0].id, ["itemName"]: data[0].name });
            }
        });
    }, []);

    useEffect(() => {
        getInventory().then(data => {
            console.log(data)
            setInventoryItems(data.fullInventory);
        });
    }, []);

    function calcAvailable(item: Array<{code: string, available: boolean}>){
        let available = 0;
        item.forEach((item) => {
            if(item.available) available++;
        });

        return available;
    }
    function totalItemsInInventory(){
        let total = 0;
        inventoryItems.forEach((item) => {
            total += item.items.length;
        });

        return total;
    }
    function totalAvailableItemsInInventory(){
        let total = 0;
        inventoryItems.forEach((item) => {
            total += calcAvailable(item.items);
        });

        return total;
    }
    return(
        <div className="flex w-full h-screen">
            
            <div className={"flex-1 transition-all flex flex-col md:p-10 md:pl-20 overflow-auto p-5 no-scrollbar "}>
            <div className="flex w-full items-center pb-5 ">

                <div className="flex-1"></div>
                <MainMenu currentPage="inventory" />
            </div>
                <div className="flex justify-start items-end">
                    <div className="flex flex-col">
                        <p className="text-gray-500 mr-5">Ukupno uređaja u<br></br> inventaru</p>
                        <div className="flex justify-center p-3 w-full">
                            <p className="text-7xl font-bold py-3">{totalItemsInInventory()}</p>
                            <div className="flex-1"></div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-gray-500 mr-5">Ukupno zaduženih<br></br>uređaja</p>
                        <div className="flex justify-center p-3 w-full">
                            <p className="text-5xl text-gray-700 font-semibold py-3">{totalItemsInInventory() - totalAvailableItemsInInventory()}</p>
                            <div className="flex-1"></div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-gray-500 mr-5">Ukupno dostupnih<br></br>uređaja</p>
                        <div className="flex justify-center p-3 w-full">
                            <p className="text-5xl text-gray-700 font-semibold py-3">{totalAvailableItemsInInventory()}</p>
                            <div className="flex-1"></div>
                        </div>
                    </div>
                    
                </div>
                <div className="fixed bottom-0 right-0 p-5 md:hidden z-10">
                    <div className="p-4 rounded-full bg-green-500 flex items-center justify-center" onClick={() => setOpen(!open)}>                       
                        {open===false?<PlusIcon className="text-white w-6 h-6" />:<MinusIcon className="text-white w-6 h-6" />}
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
                    {inventoryItems.map((item, index) => (
                        <div key={index}>
                        <InventoryDropdown index={index} item={item} settodelete={(arg: string) => setTodelete(arg)} />
                        </div>
                    ))}
                    <div className="w-full h-3"></div>
                </div>
            </div>

            <div className={"border-l transition-all overflow-hidden  md:w-96 md:p-5 flex flex-col justify-center md:justify-start absolute top-0 bg-white h-screen right-0 md:static " + (open?"w-full p-5":"w-0 p-0")}>
                <p className="text-lg p-2">Dodaj Uređaj</p>
                <div className="">
                    <p className="bg-white relative mt-5 text-xs ml-2 -mb-3 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">medicinski uređaj</p>
                    {
                        newitem?
                            <input  type="text" 
                                    onChange={(e) => setUredaj({ ...uredaj, ["itemName"]: e.target.value })} 
                                    className="p-2 pl-3 w-full border rounded focus:outline-none" />
                        :
                            <Dropdown   selected={{id: uredaj.itemId, name: uredaj.itemName}}
                                        onChange={(value) => setUredaj({ ...uredaj, ["itemId"]: value.id, ["itemName"]: value.name })} 
                                        items={dropdownOptions} />
                    }
                </div>
                <div className="flex items-center p-3">
                    <input type="checkbox" className="mr-3" onChange={() => setNewitem(!newitem)} />
                    
                    <p className="">novi medicinski uređaj</p>
                </div>
                <p className="relative bg-white mt-5 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">kod artikla</p>
                <input  type="text" 
                        className="p-2 pl-3 w-full border rounded focus:outline-none"
                        onChange={(e) => setUredaj({ ...uredaj, ["inventoryCode"]: e.target.value })} />
                <div className=" flex rounded shadow w-full p-5 my-3 items-center" onClick={() => submit(uredaj)}>
                    <p className=" flex-1 font-semibold">Dodaj u inventar</p>
                    <PlusIcon className="w-5 h-5 text-green-500" />
                </div>
            </div>



            <div className={`
            bg-white-opacity flex-col absolute w-full h-screen z-20 p-5 transition-opacity duration-200
            ${todelete!=="none"?"flex opacity-100":"flex opacity-0 -z-10"}`}>
                <div className="flex-1 transition" onClick={()=>setTodelete("none")}></div>
                <div className="flex">
                <div className="md:flex-1" onClick={()=>setTodelete("none")}></div>
                <div className="p-5 bg-white rounded shadow max-w-xl flex-1 transition mx-auto">
                    <div className="flex items-center">
                        <p className="text-lg font-semibold">UPOZORENJE</p>
                        <div className="flex-1"></div>
                        
                    </div>
                    <p className="text-sm text-gray-500">Da li sigurno želite izbrisat {todelete} iz baze</p>
                    <div className="shadow rounded p-3 flex items-center mt-3" onClick={() => remove(todelete)}>
                        <MinusIcon className="h-5 w-5 text-red-500 mr-2" />
                        <p>Potvrdi</p>
                    </div>
                </div>
                <div className="md:flex-1" onClick={()=>setTodelete("none")}></div>
                </div>
                <div className="flex-1 transition" onClick={()=>setTodelete("none")}></div>
            </div>


        </div>
    )
}