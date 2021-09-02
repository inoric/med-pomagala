import React from 'react'
import { CheckCircleIcon, ChevronUpIcon, PlusIcon, SearchIcon } from '@heroicons/react/outline'


interface Props {
    overlay: (value: string) => void
}
const people = [
    {
        name: 'John Doe',
        id: 1,
        br_tel: "063/123-456",
        adresa: "Petrovgrad, Bogu Iza Nogu 69",
    },{
        name: 'Jane Doe',
        id: 2,
        br_tel: "063/123-456",
        adresa: "Petrovgrad, Bogu Iza Nogu 69",
    },{
        br_tel: "063/123-456",
        adresa: "Petrovgrad, Bogu Iza Nogu 69",
        name: 'John Smith',
        id: 3
    },{
        br_tel: "063/123-456",
        adresa: "Petrovgrad, Bogu Iza Nogu 69",
        name: 'Jane Smith',
        id: 4
    },{
        br_tel: "063/123-456",
        adresa: "Petrovgrad, Bogu Iza Nogu 69",
        name: 'John Moe',
        id: 5
    },{
        br_tel: "063/123-456",
        adresa: "Petrovgrad, Bogu Iza Nogu 69",
        name: 'Jane Moe',
        id: 6
    },{
        br_tel: "063/123-456",
        adresa: "Petrovgrad, Bogu Iza Nogu 69",
        name: 'John Jackson',
        id: 7
    },{
        br_tel: "063/123-456",
        adresa: "Petrovgrad, Bogu Iza Nogu 69",
        name: 'Jane Jackson',
        id: 8
    },{
        br_tel: "063/123-456",
        adresa: "Petrovgrad, Bogu Iza Nogu 69",
        name: 'John Doe',
        id: 9
    },{
        br_tel: "063/123-456",
        adresa: "Petrovgrad, Bogu Iza Nogu 69",
        name: 'Kim Lee',
        id: 10
    },{
        br_tel: "063/123-456",
        adresa: "Petrovgrad, Bogu Iza Nogu 69",
        name: 'Park Smith',
        id: 11
    },{
        br_tel: "063/123-456",
        adresa: "Petrovgrad, Bogu Iza Nogu 69",
        name: 'Jack Bean',
        id: 12
    }
]



export const SearchSelector = ({overlay}: Props) => {
    const [selected, setSelected] = React.useState<number|null>(null)
    const [search, setSearch] = React.useState<string>('')

    return(
    <div>
        <p className="bg-white relative mt-5 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">ime i prezime</p>
        <div className="border rounded flex items-center">
        <input type="text" className="p-2 pl-3 flex-1 focus:outline-none" onChange={event => setSearch(event.target.value)}></input>
        <SearchIcon className="h-5 w-5 mx-3 text-gray-500" />
        </div>
        

        <div className="w-full max-h-36 md:max-h-52 border rounded mt-2 px-3 overflow-auto">
        {people.map((person, id) => (
            <div className={(person.name.includes(search))?"":"hidden"}>
            <div onClick={() => setSelected(person.id)} className={(person.id==selected)?"p-3 w-full flex justify-center shadow rounded items-center h-24 my-2 transition-all duration-300 bg-blue-100":"duration-300 transition-all px-3 w-full flex shadow rounded items-center justify-center h-12 my-2"}>
                <div className="w-full flex flex-col overflow-hidden">
                <div className="flex w-full">
                    <p className={(person.id==selected)?"text-blue-900":""} key={id}>{person.name}</p>
                    <div className="flex-1"></div>
                    
                </div>   
                <div className={"flex flex-col w-full overflow-hidden transition-all " + (person.id==selected?"h-auto":"h-0 w-0")}>
                    <p className="text-sm text-blue-900 opacity-60">{person.br_tel}</p>
                    <p className="text-sm text-blue-900 opacity-60">{person.adresa}</p>
                </div>
                </div>
                <CheckCircleIcon className={(person.id==selected)?"h-5 w-5 text-blue-900":"h-5 w-5 text-gray-500"} />
            </div>
            </div>
        ))
        }
        <div className="transition px-3 w-full flex shadow rounded items-center h-12 my-2" onClick={() => overlay("dodaj")}>
            <p>Dodaj Osobu</p>
            <div className="flex-1"></div>
            <PlusIcon className="h-5 w-5 text-green-500" />
        </div>
        </div>
    </div>
    )

}

