import scene from '@public/scene.png';
import scene0 from '@public/scene0.png';
import scene1 from '@public/scene1.png';
import scene2 from '@public/scene2.png';
import scene3 from '@public/scene3.png';
import mobile0 from '@public/mobile0.png';
import Image from 'next/image'
import { ClipboardListIcon, CollectionIcon, InformationCircleIcon, SaveIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { apiPost } from '@/api';

interface LoginData {
    username: string;
    password: string;
}
async function login({ username, password }: LoginData): Promise<{token: string, error: boolean}> {
    return apiPost('/api/login', { username, password });
}

export default function Login(props: {user: number}) {
    const [logoColor, setLogoColor] = useState('#66F');
    const [bgColor, setBgColor] = useState('#FFF');
    const [open, setOpen] = useState(false);
    const [loginData, setLoginData] = useState({username: '', password: ''});
    useEffect(() => {
        window.sessionStorage.clear();
        window.addEventListener('scroll', () => {
            const p1 = document.getElementById('p1') || {offsetHeight: 0 };
            const p2 = document.getElementById('p2') || {offsetHeight: 0};
            const p3 = document.getElementById('p3') || {offsetHeight: 0};
            if((p1.offsetHeight/2-10) <= window.scrollY && window.scrollY <= (p1.offsetHeight+p2.offsetHeight/2+10)) {
                setLogoColor('#FFF');
                setBgColor('#66F');
            }else{
                setLogoColor('#66F');
                setBgColor('#FFF');
            }
        });
        
    }, []);
    
    function plsLogin(data: {username: string, password: string}){
        login(data).then(res => {
            if(res.error){
                alert('Wrong username or password');
            }else{
                sessionStorage.setItem("token", res.token);
                window.location.href = '/';
            }
        });
    }

    return(
        <div className="transition-colors duration-300" style={{backgroundColor: `${bgColor}`}}>

            <div className="flex w-full h-14 md:h-12 items-center md:px-40 fixed z-10">
                <div className="p-3 h-full">
                <CollectionIcon className="md:h-6 md:w-6 h-7 w-7 transition-all " style={{color: `${logoColor}`}} />
                </div>
                <div className="flex-1"></div>
                <div className="p-2 h-full">
                    <button className="h-full px-3 rounded shadow font-semibold transition-colors duration-300 " onClick={() => setOpen(!open)} style={{color: `${bgColor}`, backgroundColor: `${logoColor}`}}>Login</button>
                </div>
                <div className={"absolute w-full md:w-80 p-2 right-0 top-0 md:mr-40 mt-14 md:mt-12 transition-all " +(open?"opacity-100":"opacity-0 pointer-events-none md:w-72")}>
                    <div className="bg-white shadow-xl rounded-md p-2 px-4">
                        <form onSubmit={(e) => {e.preventDefault(); plsLogin(loginData)}}>
                        <input 
                            className="w-full p-2 rounded shadow my-2" 
                            type="text" 
                            onChange={(e) => setLoginData({...loginData, ["username"]: e.target.value})}
                            placeholder="Username" />
                        <input 
                            className="w-full p-2 rounded shadow my-2" 
                            type="password" 
                            onChange={(e) => setLoginData({...loginData, ["password"]: e.target.value})} 
                            placeholder="Password" />
                        <button 
                        className="w-full p-2 rounded shadow my-2 bg-sexy text-white"
                        type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="flex h-screen flex-col md:flex-row" id="p1">
                <div className="md:w-1/2 flex justify-center p-10 pt-32 text-center md:text-left md:p-40 items-center">
                    <p className="text-5xl font-semibold">Organizacija i Praćenje <span className="text-7xl text-sexy">Inventara</span></p>
                </div>
                <div className="md:w-1/2 md:flex justify-center items-center">
                    <Image src={scene} alt="scene" width={500} height={500} />
                </div>
            </div>
            <div className="flex md:h-screen flex-col md:flex-row" id="p2">
                <div className="md:w-1/2 hidden md:flex justify-center items-center">
                    <Image src={scene3} alt="scene" width={500} height={500} />
                </div>
                <div className="md:w-1/2 flex flex-col justify-center p-10 text-center md:text-left md:p-40 items-center">
                    <p className="text-5xl font-semibold text-white" style={{color: `${logoColor=="#66F"?"#000":"#FFF"}`}}>Detaljan Pregled Svih Podataka</p>
                    <p className="text-xl text-white mt-5" style={{color: `${logoColor=="#66F"?"#000":"#FFF"}`}}>Sortiranje stupaca, filtriranje i ispis u Excel i kao PDF. Sve samo uz nekoliko klikova.</p>
                </div>
            </div>
            <div className="flex w-full flex-col overflow-hidden" id="p3">
            <p className="text-4xl font-semibold text-center transition-colors duration-300" style={{color: `${logoColor}`}}>Brzo i jednostavno</p>
                <div className="w-full flex md:flex-row flex-col items-center justify-center py-10">
                    <div className="w-80 p-3">
                        <div className="p-3 flex flex-col shadow rounded bg-white">
                            <div className="flex">
                                <div className="rounded-full w-10 flex justify-center items-center bg-green-500 mr-3">
                                    <CollectionIcon className="h-4 w-4 text-white" />
                                </div>
                                <p className="font-semibold text-lg">Pregled Inventara</p>
                            </div>
                            <p className="m-2 ">Potpuni pregled svih artikla u inventaru i njihovo trenutno stanje</p>
                        </div>
                    </div>
                    <div className="w-80 p-3">
                        <div className="p-3 flex flex-col shadow rounded bg-white">
                            <div className="flex">
                                <div className="rounded-full w-10 flex justify-center items-center bg-blue-500 mr-3">
                                    <ClipboardListIcon className="h-4 w-4 text-white" />
                                </div>
                                <p className="font-semibold text-lg">Jednostavno Zaduženje</p>
                            </div>
                            <p className="m-2 ">Zaduži medicinski uređaj u samo 5 klika</p>
                        </div>
                    </div>
                    <div className="w-80 p-3">
                        <div className="p-3 flex flex-col shadow rounded bg-white">
                            <div className="flex">
                                <div className="rounded-full w-10 flex justify-center items-center bg-red-500 mr-3">
                                    <SaveIcon className="h-4 w-4 text-white" />
                                </div>
                                <p className="font-semibold text-lg">Export</p>
                            </div>
                            <p className="m-2 ">Ispis podataka u Excel i PDF uz samo jedan klik</p>
                        </div>
                    </div>
                    
                </div>
            </div>
            <footer className="w-full p-20 border-t flex flex-col justify-center items-center">
                <p>Copyright © 2020</p>
                <p>Made By <span className="text-sexy">Cool People</span></p>
            </footer>
        </div>
    )
}

