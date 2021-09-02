import MainMenu from "./components/MainMenu";


const data = [
    {
        id: 0,
        name: "Marko Pekas",
        date: "15/8/2021",
        date_returned: "15/8/2021",
        id_opreme: "KV-01",
        ime_opreme: "Krevet el.",
        br_tel: "063/123-456",
        adresa: "Kralja Petra I Karađorđeva 1",
        preuzeo: "Stipe Miočić",
        zaduzio: "Stipe Miočić",
        razduzio: "Ivo Čičak",
    },{
        id: 1,
        name: "Ivan Jurić",
        date: "11/8/2021",
        date_returned: "15/8/2021",
        id_opreme: "KV-02",
        ime_opreme: "Krevet el.",
        br_tel: "063/123-456",
        adresa: "Ivan Lisinski 67",
        preuzeo: "Mirko Miočić",
        zaduzio: "Ivan Miočić",
        razduzio: "Ivo Lukas",
    },{
        id: 2,
        name: "Jurić Brzić",
        date: "01/8/2021",
        date_returned: "--/--/----",
        id_opreme: "HO-04",
        ime_opreme: "Hodalica",
        br_tel: "063/123-456",
        adresa: "Petrovgrad, Bogu Iza Nogu 69",
        preuzeo: "Goran Miočić",
        zaduzio: "Mirko Miočić",
        razduzio: "NaN",
    }
]

export default function Arhiva(){

    return(
        <div className="w-full flex p-5 flex-col min-h-screen">
            <div className="flex w-full items-center">
            <div className="flex-1"></div>
            <MainMenu currentPage="archive" />
            </div>
            <div className="w-full pt-15 p-5 flex flex-col justify-center items-center">
                <h1 className="text-3xl font-semibold">Arhiva</h1>
            </div>


            {data.map((person, id) => (
        <div className="">
            <div className="border-t p-3 flex">
                <div className="w-full flex flex-col items-center">
                    <div className="flex items-center w-full">
                        <p className="text-lg font-semibold">{person.name}</p>
                        <div className="flex-1"></div>
                        <p className="text-sm text-gray-500">zaduženo <span className="text-gray-700">{person.date}</span></p>
                        
                    </div>
                    <div className="flex items-center w-full">
                        <p>{person.ime_opreme} {person.id_opreme}</p>
                        <div className="flex-1"></div>
                        <p className="text-sm text-gray-500">razduženo <span className="text-gray-700">{person.date_returned}</span></p>
                    </div>
                    <div className="flex items-center w-full">
                        <div className="flex flex-col w-1/2">
                            <p className="mt-3">Preuzeo</p>
                            <p className="text-sm">{data[id].preuzeo}</p>
                            <p className="text-sm text-gray-500">{data[id].br_tel}</p>
                            <p className="text-sm text-gray-500">{data[id].adresa}</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-sm text-gray-500 text-right">zadužio <span className="text-gray-700">{person.zaduzio}</span></p>
                            <p className="text-sm text-gray-500 text-right">razdužio <span className="text-gray-700">{person.razduzio}</span></p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        ))}
        </div>
    )

}
