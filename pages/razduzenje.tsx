import { CheckIcon,  SearchIcon } from "@heroicons/react/outline";
import React, { useEffect } from "react";
import ThreeDotDropdown from "./components/ThreeDotDropdown";
import MainMenu from "./components/MainMenu";



interface OrderDetails {
    id: number, 
    name: string,
    phone: string, 
    address: string, 
    itemName: string, 
    date: string, 
    inventoryCode: string , 
    takenBy: string, 
    takenByAddress: string, 
    takenByPhone: string 
}

async function submit(item: {orderId: number, takenByid: number, returnedAt: string}) {
    const response = await fetch('/api/returnorder', {
        method: 'POST',
        body: JSON.stringify({
            orderId: item.orderId,
            takenByid: item.takenByid,
            returnedAt: item.returnedAt
        })
    });
    if (!response.ok){
        throw new Error('Failed to fetch.' + response.statusText);
    }
    return await response.json();
}

async function getOrders(): Promise<OrderDetails[]> {
    const response = await fetch('/api/getorders', {
        method: 'GET'
    });
    if (!response.ok){
      throw new Error('Failed to fetch.' + response.statusText);
    }
    return await response.json();
  }


function Razduzenje(){
    
    const [search, setSearch] = React.useState<string>('')
    const [overlay, setOverlay] = React.useState<string>("none")
    const [id, setId] = React.useState<number>(0)
    const [date, setDate] = React.useState<string>(new Date(Date.now()).toLocaleString().split(',')[0])

    const [orders, setOrders] = React.useState<OrderDetails[]>([])
    const [activeOrder, setActiveOrder] = React.useState<OrderDetails>({
        id: 0, 
        name: "",
        phone: "", 
        address: "", 
        itemName: "", 
        date: "", 
        inventoryCode: "" , 
        takenBy: "", 
        takenByAddress: "", 
        takenByPhone: "" 
    })
    useEffect(() => {
        getOrders().then(data => {
            setOrders(data)
        })
    }, [])

    useEffect(() => {
        setActiveOrder(orders.find(obj => {
            return obj.id === id
          }) || {
            id: 0, 
            name: "",
            phone: "", 
            address: "", 
            itemName: "", 
            date: "", 
            inventoryCode: "" , 
            takenBy: "", 
            takenByAddress: "", 
            takenByPhone: "" 
        })
    }, [id])


    function setOverlayData(overlayData: string, id: number){
        setId(id);
        setOverlay(overlayData);
    }

    


    return (
    <div className="w-full flex flex-col min-h-screen">
        <div className="flex w-full items-center p-5">

            <div className="flex-1"></div>
            <MainMenu currentPage="razduzenje" />
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
                {orders.map((order, id) => (
                <div key={id} className={(order.name.includes(search))?"":"hidden"}>
                    <div className="border-t p-3 flex">
                        <div className="w-full flex flex-col items-center ml-4">
                            <div className="flex items-center w-full">
                                <p className="text-lg font-semibold">{order.name}</p>
                                <div className="flex-1"></div>
                                <p className="text-sm text-gray-500">{order.date}</p>
                                
                            </div>
                            <div className="flex items-center w-full">
                                <p>{order.itemName}</p>
                                <div className="flex-1"></div>
                                <p className="text-sm text-gray-500">{order.inventoryCode}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <ThreeDotDropdown id={order.id} increment={ (arg: string, arg2: number) => setOverlayData(arg, arg2) } />
                        </div>
                    </div>
                </div>
                ))}
                <div className="h-big"></div>
            </div>
        </div>
        <div className={`
            bg-white-opacity flex-col fixed w-full h-screen z-20 p-5 transition-opacity duration-200
            ${overlay==="detalji"?"flex opacity-100":"flex opacity-0 -z-10"}`}>
            <div className="flex-1 transition" onClick={()=>setOverlay("none")}></div>
            <div className="flex">
            <div className="md:flex-1" onClick={()=>setOverlay("none")}></div>
            <div className="p-5 bg-white rounded shadow max-w-xl flex-1 transition mx-auto">
                <div className="flex items-center">
                    <p className="text-lg font-semibold">{activeOrder.name}</p>
                    <div className="flex-1"></div>
                    <p className="text-sm text-gray-500">{activeOrder.date}</p>
                </div>
                <div className="flex items-center">
                    <p className="">{activeOrder.itemName}</p>
                    <div className="flex-1"></div>
                    <p className="text-sm text-gray-500">{activeOrder.inventoryCode}</p>
                </div>
                <div className="flex flex-col">
                    <p className="mt-3">Preuzeo</p>
                    <p className="text-sm">{activeOrder.takenBy}</p>
                    <p className="text-sm text-gray-500">{activeOrder.takenByPhone}</p>
                    <p className="text-sm text-gray-500">{activeOrder.takenByAddress}</p>
                </div>
                <div className="shadow rounded p-3 flex items-center mt-3" onClick={() => {setOverlay("razduzi")}}>
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <p>Razduži</p>
                </div>
            </div>
            <div className="md:flex-1" onClick={()=>setOverlay("none")}></div>
            </div>
            <div className="flex-1 transition" onClick={()=>setOverlay("none")}></div>
        </div>



        <div className={`
            bg-white-opacity flex-col fixed w-full h-screen z-20 p-5 transition-opacity duration-200
            ${overlay==="razduzi"?"flex opacity-100":"flex opacity-0 -z-10"}`}>
            <div className="flex-1 transition" onClick={()=>setOverlay("none")}></div>
            <div className="flex">
            <div className="md:flex-1" onClick={()=>setOverlay("none")}></div>

            <div className="p-5 flex-1 flex flex-col bg-white rounded shadow max-w-xl transition mx-auto">
                <div className="flex items-center">
                    <p className="text-lg font-semibold">{activeOrder.name}</p>
                    <div className="flex-1"></div>
                    <p className="text-sm text-gray-500">{activeOrder.date}</p>
                </div>
                <div className="flex items-center">
                    <p className="">{activeOrder.itemName}</p>
                    <div className="flex-1"></div>
                    <p className="text-sm text-gray-500">{activeOrder.inventoryCode}</p>
                </div>
                <div className="flex flex-col">

                <p className="bg-white mt-2 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">datum</p>
                <input 
                type="text" 
                className="p-2 pl-3  border rounded focus:outline-none" 
                defaultValue={date} 
                placeholder="dd/mm/yyyy"
                onChange={(e) => setDate(e.target.value)}></input>
                </div>
                <div className="shadow rounded p-3 flex items-center mt-3" onClick={() => {submit( { orderId: activeOrder.id, takenByid: -1, returnedAt: date } );setOverlay("none");window.location.reload()}}>
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <p>Potvrdi</p>
                </div>
            </div>
            <div className="md:flex-1" onClick={()=>setOverlay("none")}></div>

            </div>
            <div className="flex-1 transition" onClick={()=>setOverlay("none")}></div>
        </div>

        
    </div>
    );
}

export default Razduzenje;