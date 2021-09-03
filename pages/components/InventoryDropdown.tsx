import { ChevronDownIcon, ChevronUpIcon, MinusIcon } from "@heroicons/react/outline";
import { useState } from "react";

interface Props {
    index: number,
    item: {
        name: string;
        items: {
            code: string;
            available: boolean;
        }[];
    },
    settodelete: (index: string) => void;
}


export default function InventoryDropdown({index, item, settodelete}: Props){
    const [open, setOpen] = useState<string>("none");
    function calcAvailable(item: Array<{code: string, available: boolean}>){
        let available = 0;
        item.forEach((item) => {
            if(item.available) available++;
        });

        return available;
    }
    return(
        <div className="transition-all" key={index}>
            <div className="flex border-t items-center justify-between">
                <div className="flex flex-col p-2 flex-1">
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-gray-500">{}</p>
                </div>
                
                <p className="flex-1">{item.items.length - calcAvailable(item.items)}</p>
                <p className="flex-1">{calcAvailable(item.items)}</p>
                <p className="font-semibold flex-1">{item.items.length}</p>
                {open===item.name?<ChevronUpIcon className="h-6 w-6 text-gray-500" onClick={() => setOpen("none")} />:<ChevronDownIcon className="h-6 w-6 text-gray-500" onClick={() => setOpen(item.name)} />}
            </div>
            <div key={index} className={"overflow-hidden transition-all duration-700 relative "} style={{height: `${(open===item.name?item.items.length*41:0)}px`}}>
            {item.items.map((items, index) => (
                <div className="flex border-t items-center justify-between" key={index}>
                    <div className="flex flex-col p-2 flex-1">
                        <p className="text-gray-500">{items.code}</p>
                    </div>
                    <p className={"px-5 " + (items.available?"text-green-500":"text-red-500")}>{items.available?"dostupno":"zaduženo"}</p>
                    <MinusIcon className="h-6 w-6 text-red-500" onClick={() => settodelete(items.code)} />
                </div>
            ))}
            </div>
        </div>
    
    )
}