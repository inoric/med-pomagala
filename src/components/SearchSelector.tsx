import React from 'react'
import { CheckCircleIcon, ChevronUpIcon, PlusIcon, SearchIcon } from '@heroicons/react/outline'


interface Props {
    
}
const people = [
    {
        name: 'John Doe',
        id: 1
    },{
        name: 'Jane Doe',
        id: 2
    },{
        name: 'John Smith',
        id: 3
    },{
        name: 'Jane Smith',
        id: 4
    },{
        name: 'John Moe',
        id: 5
    },{
        name: 'Jane Moe',
        id: 6
    },{
        name: 'John Jackson',
        id: 7
    },{
        name: 'Jane Jackson',
        id: 8
    },{
        name: 'John Doe',
        id: 9
    },{
        name: 'Kim Lee',
        id: 10
    },{
        name: 'Park Smith',
        id: 11
    },{
        name: 'Jack Bean',
        id: 12
    }
]



export const SearchSelector = (props: Props) => {
    const [selected, setSelected] = React.useState<number|null>(null)
    const [search, setSearch] = React.useState<string>('')

    return(
    <div>
        <p className="bg-white relative mt-5 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">ime i prezime</p>
        <div className="border rounded flex items-center">
        <input type="text" className="p-2 pl-3 flex-1 focus:outline-none" onChange={event => setSearch(event.target.value)}></input>
        <SearchIcon className="h-5 w-5 mx-3 text-gray-500" />
        </div>
        

        <div className="w-full max-h-36 border rounded mt-2 px-3 overflow-auto">
        {people.map((person, id) => (
            <div className={(person.name.includes(search))?"":"hidden"}>
            <div onClick={() => setSelected(person.id)} className={(person.id==selected)?"px-3 w-full flex shadow rounded items-center h-12 my-2 bg-blue-100":"transition px-3 w-full flex shadow rounded items-center h-12 my-2"}>
                <p className={(person.id==selected)?"text-blue-900":""} key={id}>{person.name}</p>
                <div className="flex-1"></div>
                <CheckCircleIcon className={(person.id==selected)?"h-5 w-5 text-blue-900":"h-5 w-5 text-gray-500"} />
            </div>
            </div>
        ))
        }
        <div className="transition px-3 w-full flex shadow rounded items-center h-12 my-2">
            <p>Dodaj Osobu</p>
            <div className="flex-1"></div>
            <PlusIcon className="h-5 w-5 text-gray-500" />
        </div>
        </div>
    </div>
    )

}

