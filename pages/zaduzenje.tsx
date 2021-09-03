import { useEffect, useState } from 'react'
import {  PlusIcon } from '@heroicons/react/outline'
import { Dropdown } from './components/Dropdown';
import { SearchSelector } from './components/SearchSelector';
import MainMenu from './components/MainMenu';
import Image from 'next/image'

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

async function getUsers(): Promise<{id: number, name: string, lastname: string, address: string, phone: string}[]> {
  const response = await fetch('/api/getusers', {
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


async function getInventoryCodes(item: number): Promise<{id: number, itemId: string, code: string, available: boolean}[]> {
  const response = await fetch('/api/getinventorycodes', {
      method: 'POST',
      body: JSON.stringify({item})
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
  const [overlay, setOverlay] = useState("none");
  let date = new Date(Date.now()).toLocaleString().split(',')[0]


  const [osoba, setOsoba] = useState<User>({name: "", lastname: "", address: "", phone: ""});
  const [dropdownUserOptions, setDropdownUserOptions] = useState<{id: number, name: string, lastname: string, address: string, phone: string}[]>([]);


  const [dropdownOptions, setDropdownOptions] = useState<{id: number, name: string, available: boolean}[]>([]);
  const [dropdownCodeOptions, setDropdownCodeOptions] = useState<{id: number, name: string, available: boolean}[]>([]);
  const [zaduzenje, setZaduzenje] = useState<Order>({itemId: 0, itemName: "", inventoryCode: "", userId: 0, takenById: 0, givenById: -1, takenAt: date});
  
  useEffect(() => {
      getItems().then(data => {
          let options: {id: number, name: string, available: boolean}[] = []
          for (let i = 0; i < data.length; i++) {
            options.push({id: data[i].id, name: data[i].name, available: true})
          }
          setDropdownOptions(options);
          if(zaduzenje.itemName === ""){
          setZaduzenje({ ...zaduzenje, ["itemId"]: data[0].id, ["itemName"]: data[0].name });
          }
      });
      
  }, []);
  useEffect(() => {
    getInventoryCodes(zaduzenje.itemId).then(data => {
      let options: {id: number, name: string, available: boolean}[] = []
      for (let i = 0; i < data.length; i++) {
        options.push({id: data[i].id, name: data[i].code, available: data[i].available})
      }
      setDropdownCodeOptions(options);
      
    });
  }, [zaduzenje.itemId]);
  useEffect(() => {
    if(dropdownCodeOptions[0] !== undefined)
    setZaduzenje({ ...zaduzenje, ["inventoryCode"]: dropdownCodeOptions[0].name });
  }, [dropdownCodeOptions]);
  useEffect(() => {
    getUsers().then(data => {
      setDropdownUserOptions(data);
    });
  }, []);

  return (
  <div className="w-full flex  min-h-screen justify-center">
    <div className="flex flex-col p-5 flex-1">
    <div className="flex w-full items-center">
      <div className="flex-1"></div>
      <MainMenu currentPage="zaduzenje" />
    </div>
    <div className="w-full flex justify-center">
    <Image height={200} width={200} src="/humaaans.png" ></Image>
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
            onClick={() => submit(zaduzenje)}>
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
                <div className="shadow rounded p-3 flex items-center mt-3" onClick={() => {addUser(osoba); setOverlay("razduzi")}}>
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
