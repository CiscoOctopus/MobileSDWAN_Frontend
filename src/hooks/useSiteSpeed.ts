import { useState, useEffect } from "react";

// for demo purposes
export function useSiteSpeed() {
    const [site, setSite] = useState<Site[]>([])
    // initialize
    useEffect(() => {
        // TODO start timestamp for client side latency detection
        // TODO move to configuration file
        let devs = [
        { name: 'ASABJ', addr: '109.244.15.243', 'label': 'Bei Jing', latency: -1, src: 'http://109.244.15.115:10000/Baidu-Logo.png' },
        { name: 'ASASH', addr: '43.254.46.136', 'label': 'Shang Hai', latency: -1, src: 'http://109.244.44.194:10000/Baidu-Logo.png' },
        { name: 'ASASZ', addr: '109.244.68.86', 'label': 'Shen Zhen', latency: -1, src: 'http://109.244.68.13:10000/Baidu-Logo.png' }]

        console.log(new Date().getTime());
        setSite(devs);
    }, []);

    // cross launch, popup the anyconnect connection window
    const connect = (company: any, username:any, password:any, addr:any)=>{
        let uri = `anyconnect://connect?host=${addr}&prefill_username=${username}@${company}&prefill_password=${password}`
        window.open(uri, '_blank');
    }

    return {
        site,
        connect
    }
}

// data structure
export interface Site {
    name: string, // site name
    addr: string, // IP address
    label: string, // site display name
    latency: number, // latency from server to the site
    src: string // resource can be downloaded from the site
}
