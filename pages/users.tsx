import { PencilIcon, SearchIcon, TrashIcon,  } from "@heroicons/react/outline";
import React, { useEffect } from "react";
import MainMenu from "../components/MainMenu";
import ThreeDotUsersDropdown from "../components/ThreeDotUsersDropdown";


interface User {
    id: number, 
    name: string, 
    lastname: string, 
    address: string, 
    phone: string
}
async function getUsers(): Promise<User[]> {
    const response = await fetch('/api/getusers', {
        method: 'GET'
    });
    if (!response.ok){
      throw new Error('Failed to fetch.' + response.statusText);
    }
    return await response.json();
}

async function deleteUser(item: number): Promise<User[]> {
    const response = await fetch('/api/deleteuser', {
        method: 'POST',
        body: JSON.stringify({id: item}),
    });
    if (!response.ok){
      throw new Error('Failed to fetch.' + response.statusText);
    }
    return await response.json();
  }

async function submit(item: User) {
    const response = await fetch('/api/edituser', {
        method: 'POST',
        body: JSON.stringify({
            id: item.id,
            name: item.name,
            lastname: item.lastname,
            address: item.address,
            phone: item.phone
        })
    });
    if (!response.ok){
        throw new Error('Failed to fetch.' + response.statusText);
    }
    return await response.json();
}

export default function Users(){
    const [search, setSearch] = React.useState<string>('')
    const [overlay, setOverlay] = React.useState<string>("none")
    const [id, setId] = React.useState<number>(0)
    function setOverlayData(overlayData: string, id: number){
        setId(id);
        setOverlay(overlayData);
    }

    let date = new Date(Date.now()).toLocaleString().split(',')[0]

    const [users, setUsers] = React.useState<User[]>([]);
    const [activeUser, setActiveUser] = React.useState<User>({
        id: 0, 
        name: "", 
        lastname: "", 
        address: "", 
        phone: ""
    })
    useEffect(() => {
        getUsers().then(data => setUsers(data))
    }, [])

    useEffect(() => {
        setActiveUser(users.find(obj => {
            return obj.id === id
          }) || {
            id: 0, 
            name: "", 
            lastname: "", 
            address: "", 
            phone: ""
        })
    }, [id])



    return (
        <div className="flex w-full min-h-screen flex-col">
            <div className="flex w-full items-center p-5">

                <div className="flex-1"></div>
                <MainMenu currentPage="users" />
            </div>
            <div className="w-full pt-15 p-5 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold">Korisnici</h1>
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
                {users.map((person, id) => (
                <div key={id} className={(person.name.includes(search))?"":"hidden"}>
                    <div className="border-t p-3 flex">
                        <div className="w-full flex flex-col items-center ml-4">
                            <div className="flex items-center w-full">
                                <p className="text-lg font-semibold">{person.name} {person.lastname}</p>
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
                        <p className="bg-white relative mt-5 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">ime</p>
                        <input type="text" 
                        defaultValue={activeUser.name} 
                        className="border rounded w-full p-2 pl-3 flex-1 focus:outline-none"
                        onChange={event => setActiveUser({...activeUser, name: event.target.value})}></input>
                    </div>
                    <div className="w-full">
                        <p className="bg-white relative mt-5 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">prezime</p>
                        <input type="text" 
                        defaultValue={activeUser.lastname} 
                        className="border rounded w-full p-2 pl-3 flex-1 focus:outline-none"
                        onChange={event => setActiveUser({...activeUser, lastname: event.target.value})}></input>
                    </div>
                    <div className="w-full">
                        <p className="bg-white relative mt-5 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">broj telefona</p>
                        <input type="text" 
                        defaultValue={activeUser.phone} 
                        className="border rounded w-full p-2 pl-3 flex-1 focus:outline-none"
                        onChange={event => setActiveUser({...activeUser, phone: event.target.value})}></input>
                    </div>
                    <div className="w-full">
                        <p className="bg-white relative mt-5 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">adresa</p>
                        <input type="text" 
                        defaultValue={activeUser.address} 
                        className="border rounded w-full p-2 pl-3 flex-1 focus:outline-none"
                        onChange={event => setActiveUser({...activeUser, address: event.target.value})}></input>
                    </div>
                </div>
                <div className="shadow rounded p-3 flex items-center mt-3" onClick={() => {submit(activeUser); setOverlay("razduzi")}}>
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
                    <p className="text-sm text-gray-500">Da li sigurno želite izbrisat osobu {activeUser.name} iz baze?</p>
                    <div className="shadow rounded p-3 flex items-center mt-3"
                    onClick={() => {deleteUser(activeUser.id); setOverlay("razduzi"); window.location.reload()}}>
                
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