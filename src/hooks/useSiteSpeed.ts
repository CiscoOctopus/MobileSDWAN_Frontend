import { useState, useEffect } from "react";

// let LATENCY_API = "http://109.244.44.194:18080/api/v1/latency"


export function useSiteSpeed() {
    const [site, setSite] = useState<Site[]>([])

    useEffect(() => {
        //start timestamp
        let devs = [
        { name: 'ASABJ', addr: '109.244.15.243', 'label': 'Bei Jing', latency: -1, src: 'http://109.244.15.115:10000/Baidu-Logo.png' },
        { name: 'ASASH', addr: '43.254.46.136', 'label': 'Shang Hai', latency: -1, src: 'http://109.244.44.194:10000/Baidu-Logo.png' },
        { name: 'ASASZ', addr: '109.244.68.86', 'label': 'Shen Zhen', latency: -1, src: 'http://109.244.68.13:10000/Baidu-Logo.png' }]

        setSite(devs);
    }, []);

    const connect = (username:any, password:any, addr:any)=>{
        let uri = `anyconnect://connect?host=${addr}&prefill_username=${username}&prefill_password=${password}`
        window.open(uri, '_blank');
    }

    return {
        site,
        connect
    }
}

export interface Site {
    name: string,
    addr: string,
    label: string,
    latency: number,
    src: string
}
