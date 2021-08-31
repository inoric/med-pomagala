import { Link } from "react-router-dom";
import { ChevronLeftIcon, ClipboardCheckIcon, ClipboardListIcon } from "@heroicons/react/outline";
function Razduzenje(){
    return (
    <div className="w-full flex p-5 flex-col min-h-screen">
        <div className="flex w-full items-center">
        <Link to="/" className="flex items-center">
            <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
            <p className="text-gray-500">back</p>
        </Link>
        <div className="flex-1"></div>
        <ClipboardCheckIcon className="h-5 w-5 text-gray-500" />
        </div>
        <div className="p-3 w-full flex flex-col shadow rounded items-center my-2">
            <div className="flex items-center w-full">
                <p>Marko Pekas</p>
                <div className="flex-1"></div>
                <p className="text-sm text-gray-500">15/8/2021</p>
            </div>
            <div className="flex items-center w-full">
                <p>Krevet el.</p>
                <p>KV-01</p>
            </div>
        </div>
    </div>
    );
}

export default Razduzenje;