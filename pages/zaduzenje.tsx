import { useEffect, useState } from 'react'
import {  PlusIcon } from '@heroicons/react/outline'
import { Dropdown } from '../components/Dropdown';
import { SearchSelector } from '../components/SearchSelector';
import MainMenu from '../components/MainMenu';
import Image from 'next/image'
import { useRouter } from 'next/dist/client/router';

interface Order {
  itemId: number, 
  itemName: string, 
  inventoryCode: string, 
  userId: number, 
  takenById: number, 
  givenById: number,
  takenAt: string,
}

interface User {
  name: string, 
  lastname: string, 
  address: string, 
  phone: string
}
interface Inventory {
  id: number;
  name: string;
  items:
      {
          code: string;
          available: boolean;
      }[]
}
async function getUsers(): Promise<{id: number, name: string, lastname: string, address: string, phone: string}[]> {
  const response = await fetch('/api/getusers', {
      method: 'GET'
  });
  if (!response.ok){
    throw new Error('Failed to fetch.' + response.statusText);
  }
  return await response.json();
}

async function submit(item: Order) {
  const response = await fetch('/api/addorder', {
      method: 'POST',
      body: JSON.stringify({
        itemId: item.itemId,
        inventoryCode: item.inventoryCode,
        userId: item.userId,
        takenById: item.takenById,
        givenById: item.givenById,
        takenAt: item.takenAt,
      })
  });
  if (!response.ok){
    throw new Error('Failed to fetch.' + response.statusText);
  }
  return await response.json();
}

async function getInventory(): Promise<{fullInventory: Inventory[]}> {
  const response = await fetch('/api/getinventory', {
      method: 'POST',
  });
  if (!response.ok){
    throw new Error('Failed to fetch.' + response.statusText);
  }
  return await response.json();
}

async function addUser(item: User) {
  const response = await fetch('/api/adduser', {
      method: 'POST',
      body: JSON.stringify({
        name: item.name,
        lastname: item.lastname,
        phone: item.phone,
        address: item.address,
      })
  });
  if (!response.ok){
    throw new Error('Failed to fetch.' + response.statusText);
  }
  return await response.json();
}



function Zaduzenje() {
  const router = useRouter();
  const [overlay, setOverlay] = useState("none");
  let date = new Date(Date.now()).toLocaleString().split(',')[0]


  const [error, setError] = useState("");
  const [updateUsers, setUpdateUsers] = useState(false);

  const [osoba, setOsoba] = useState<User>({name: "", lastname: "", address: "", phone: ""});
  const [dropdownUserOptions, setDropdownUserOptions] = useState<{id: number, name: string, lastname: string, address: string, phone: string}[]>([]);


  const [dropdownOptions, setDropdownOptions] = useState<{id: number, name: string, available: boolean}[]>([]);
  const [dropdownCodeOptions, setDropdownCodeOptions] = useState<{id: number, name: string, available: boolean}[]>([]);
  const [zaduzenje, setZaduzenje] = useState<Order>({itemId: -1, itemName: "", inventoryCode: "", userId: -1, takenById: -1, givenById: 1, takenAt: date});
  const [inventory, setInventory] = useState<Inventory[]>([]);
  useEffect(() => {
      getInventory().then(data => {
        setInventory(data.fullInventory);
        const raw = data.fullInventory
        let options: {id: number, name: string, available: boolean}[] = []
        for (let i = 0; i < raw.length; i++) {
          options.push({id: raw[i].id, name: raw[i].name, available: true})
        }
        setDropdownOptions(options);
        console.log(options);
        if(zaduzenje.itemName === ""){
          setZaduzenje({ ...zaduzenje, ["itemId"]: raw[0].id, ["itemName"]: raw[0].name });
        }
      });
      
  }, []);
  useEffect(() =>{
    if(window.sessionStorage.getItem("id")===null){
        window.location.href = '/login';
    }
    setZaduzenje({ ...zaduzenje, ["givenById"]: parseInt(window.sessionStorage.getItem("id") || "1") });
  }, [])
  useEffect(() => {
    for(let i = 0; i < inventory.length; i++){
      if(inventory[i].id === zaduzenje.itemId){
        let options: {id: number, name: string, available: boolean}[] = []
        for (let j = 0; j < inventory[i].items.length; j++) {
          options.push({id: -1, name: inventory[i].items[j].code, available: inventory[i].items[j].available})
        }
        setDropdownCodeOptions(options);
      }
    }
  }, [zaduzenje.itemId]);
  useEffect(() => {
    if(dropdownCodeOptions[0] !== undefined)
      for(let i=0;i<dropdownCodeOptions.length;i++)
        if(dropdownCodeOptions[i].available === true){
          setZaduzenje({ ...zaduzenje, ["inventoryCode"]: dropdownCodeOptions[i].name });
          break
        }
  }, [dropdownCodeOptions]);
  useEffect(() => {
    getUsers().then(data => {
      setDropdownUserOptions(data);
    });
  }, [updateUsers]);
  console.log(zaduzenje);
  return (
  <div className="w-full flex  min-h-screen justify-center">

    <div className={"fixed bottom-0 right-0 w-full p-5 md:w-110 transition-all z-50" + (error === "" ? " -mb-20":"") } onClick={() => setError("")}>
        <div className="bg-red-500 text-white p-3 rounded shadow-xl">
            <p className="text-xl font-semibold">Error</p>
            <p className="">{error}</p>
        </div>
    </div>


    <div className="flex flex-col p-5 flex-1">
    <div className="flex w-full items-center">
      <div className="flex-1"></div>
      <MainMenu currentPage="zaduzenje" />
    </div>
    
    <div className="w-full pt-15 p-5 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold">Zaduzenje</h1>
    </div>
    <div className="flex flex-col md:flex-row max-w-5xl md:min-w-60 md:mx-auto">

    <div className="flex-1 md:p-3">
      <SearchSelector 
      tag="ime i prezime"
      overlay={(arg: string) => setOverlay(arg)} 
      onChange={(arg: number) => setZaduzenje({...zaduzenje, ["userId"]: arg})}
      options={dropdownUserOptions}
      selected={zaduzenje.userId}
      />
    </div>
    <div className="flex-1 md:p-3">
      <SearchSelector 
      tag="preuzima"
      overlay={(arg: string) => setOverlay(arg)} 
      onChange={(arg: number) => setZaduzenje({...zaduzenje, ["takenById"]: arg})}
      options={dropdownUserOptions}
      selected={zaduzenje.takenById}
      />
    </div>
    <div className="flex flex-col flex-1 p-3 md:justify-evenly">
    <div className="w-full flex">
      <div className="flex-1 mr-2">
        <p className="bg-white relative mt-5 text-xs ml-2 -mb-3 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">medicinski uređaj</p>
        <Dropdown   selected={{id: zaduzenje.itemId, name: zaduzenje.itemName}}
                    onChange={(value) => setZaduzenje({ ...zaduzenje, ["itemId"]: value.id, ["itemName"]: value.name })} 
                    items={dropdownOptions} />
      </div>
  
      <div className="w-32">
        <p className="bg-white mt-5 relative text-xs ml-2 -mb-3 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">kod artikla</p>
        <Dropdown   selected={{id: zaduzenje.itemId, name: zaduzenje.inventoryCode}}
                    onChange={(value) => setZaduzenje({ ...zaduzenje, ["inventoryCode"]: value.name })} 
                    items={dropdownCodeOptions} />
      </div>
    </div>
    

    
    <div>
      <p className="bg-white relative mt-5 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">datum</p>
      <input 
      type="text" 
      className="p-2 pl-3 w-full border rounded focus:outline-none" 
      defaultValue={date} 
      placeholder="dd/mm/yyyy"
      onChange={(e) => setZaduzenje({ ...zaduzenje, ["takenAt"]: e.target.value})} />
    </div>
    


    <div className="p-3-ml-5 w-full mt-auto md:hidden">
      
    </div>
    </div>
    
    </div>
    <button className="rounded max-w-xl z-0 mx-auto mt-3 shadow w-full p-3 text-white bg-blue-900 font-semibold text-lg active:bg-blue-900 active:text-white"
            onClick={() => {
              if(zaduzenje.userId === -1 || zaduzenje.takenById === -1 || zaduzenje.itemId === -1 || zaduzenje.inventoryCode === "")
              setError("Unesi sva polja prvo!")
              else{
                submit(zaduzenje)
                router.push("/razduzenje")
              }
            }}>
    unesi</button>
    </div>


    <div className={`
            bg-white-opacity flex-col fixed top-0 right-0 w-full h-screen z-20 p-5 transition-opacity duration-200
            ${overlay==="dodaj"?"flex opacity-100":"flex opacity-0 -z-10"}`}>
            <div className="flex-1 transition" onClick={()=>setOverlay("none")}></div>
            <div className="md:flex p-2">
              <div className="md:flex-1" onClick={()=>setOverlay("none")}></div>
              <div className="p-5 bg-white rounded shadow transition md:max-w-xl mx-auto">
                <div className="flex flex-col">
                  <p className="text-lg">Dodaj osobu</p>
                  <div className="flex-1 md:flex">
                    <div className="flex-1 flex flex-col pr-1">
                      <p className="relative bg-white mt-2 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">ime</p>
                      <input  type="text" 
                              onChange={(e) => setOsoba({ ...osoba, ["name"]: e.target.value })} 
                              className="p-2 pl-3 min-w-0 border rounded focus:outline-none"/>
                    </div>
                    <div className="flex-1 flex flex-col pl-1">
                      <p className="relative bg-white mt-2 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">prezime</p>
                      <input  type="text" 
                              onChange={(e) => setOsoba({ ...osoba, ["lastname"]: e.target.value })}
                              className="p-2 pl-3 min-w-0 border rounded focus:outline-none"/>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <p className="relative bg-white mt-2 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">adresa</p>
                    <input  type="text" 
                            onChange={(e) => setOsoba({ ...osoba, ["address"]: e.target.value })}
                            className="p-2 pl-3 min-w-0 border rounded focus:outline-none"/>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <p className="relative bg-white mt-2 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">br tel</p>
                    <input  type="text" 
                            onChange={(e) => setOsoba({ ...osoba, ["phone"]: e.target.value })}
                            className="p-2 pl-3 min-w-0 border rounded focus:outline-none"/>
                  </div>
                </div>
                <div 
                  className="shadow rounded p-3 flex items-center mt-3" 
                  onClick={() => {
                    addUser(osoba); 
                    setOverlay("razduzi");
                    setUpdateUsers(!updateUsers);
                  }}>
                      <PlusIcon className="h-5 w-5 text-green-500 mr-2" />
                      <p>Dodaj</p>
                  </div>
                  
              </div>
              <div className="md:flex-1" onClick={()=>setOverlay("none")}></div>
            </div>
            <div className="flex-1 transition" onClick={()=>setOverlay("none")}></div>
        </div>
        


  </div>
  );
}


export default Zaduzenje;
