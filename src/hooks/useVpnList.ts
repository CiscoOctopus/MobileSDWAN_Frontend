
// const PHOTO_STORAGE = "photos";
import { useState, useEffect } from "react";

let VPN_API = "http://109.244.44.194:18080/api/v1/vpn"

export function useVpnList() {
    const [vpnList, setVpnList] = useState<Vpn[]>([]);

    useEffect(() => {
        const load = async () => {
            fetch(VPN_API).then(e => {
                let data = e.json();
                data.then(x=>{
                   setVpnList(x);
                })
            });
        }
        load();
    }, []);

    const deleteVpn = async (vpn: Vpn) => {
        const newVpnList = vpnList.filter(p => p.username !== vpn.username);
        // TODO

        setVpnList(newVpnList)
    };

    const addUser = async(vpn: Vpn) => {
        const newVpnList = [vpn, ...vpnList];
        fetch(VPN_API, {
            method: 'post',
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(vpn)
        }).then(res => setVpnList(newVpnList)
        ).then(res => console.log(res));
    }

    return {
        vpnList,
        deleteVpn,
        addUser
    };
}

export interface Vpn {
    username: string;
    company_name: string;
    password?: string;
    devices?: Array<string>;
}
