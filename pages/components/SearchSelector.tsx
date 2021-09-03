import React from 'react'
import { CheckCircleIcon, ChevronUpIcon, PlusIcon, SearchIcon } from '@heroicons/react/outline'


interface Props {
    tag: string
    overlay: (value: string) => void
    onChange: (value: number) => void
    options: {id: number, name: string, lastname: string, address: string, phone: string}[]
    selected: number
}




export const SearchSelector = ({overlay, options, onChange, selected, tag}: Props) => {
    //const [selected, setSelected] = React.useState<number|null>(null)
    const [search, setSearch] = React.useState<string>('')

    return(
    <div>
        <p className="bg-white relative mt-5 text-xs ml-5 -mb-2 text-gray-500 z-10 max-w-min whitespace-nowrap px-2">{tag}</p>
        <div className="border rounded flex items-center">
        <input type="text" className="p-2 pl-3 flex-1 focus:outline-none" onChange={event => setSearch(event.target.value)}></input>
        <SearchIcon className="h-5 w-5 mx-3 text-gray-500" />
        </div>
        

        <div className="w-full max-h-36 md:max-h-52 border rounded mt-2 px-3 overflow-auto">
        {options.map((person, id) => (
            <div key={id} className={((person.name + " " + person.lastname).includes(search))?"":"hidden"}>
            <div onClick={() => onChange(person.id)} className={(person.id==selected)?"p-3 w-full flex justify-center shadow rounded items-center h-24 my-2 transition-all duration-300 bg-blue-100":"duration-300 transition-all px-3 w-full flex shadow rounded items-center justify-center h-12 my-2"}>
                <div className="w-full flex flex-col overflow-hidden">
                <div className="flex w-full">
                    <p className={(person.id==selected)?"text-blue-900":""}>{person.name} {person.lastname}</p>
                    <div className="flex-1"></div>
                    
                </div>   
                <div className={"flex flex-col w-full overflow-hidden transition-all " + (person.id==selected?"h-auto":"h-0 w-0")}>
                    <p className="text-sm text-blue-900 opacity-60">{person.phone}</p>
                    <p className="text-sm text-blue-900 opacity-60">{person.address}</p>
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

