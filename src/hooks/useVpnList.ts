import { useState, useEffect } from "react";

/** demo. should moved to config file */
let VPN_API = "http://109.244.44.194:18080/api/v1/vpn"

/**
 * perform add new vpn, delete vpn and get vpn details.
 */
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

    // delete
    const deleteVpn = async (vpn: Vpn) => {
        const newVpnList = vpnList.filter(p => p.username !== vpn.username);
        // use fetch library to perform delete operation
        fetch(VPN_API + '/' + vpn.username, {method: 'DELETE'}).then(response => {
            console.log(response);
        });
        // update vpnList state
        setVpnList(newVpnList)
    };

    // add user
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

// vpn data structure
export interface Vpn {
    username: string;
    company_name: string;
    password?: string; // optional
    devices?: Array<string>; // optional
}
