# Mobile SDWAN User admin and Client (Ionic React and Capacitor)

Mobile SDWAN PoC Solution:

Cisco ASA + Cisco NSO + Cisco SDWAN = Mobile SDWAN solution

## Requirements
- Cisco NSO 5.0+
- Cisco ASA NED (cisco-asa-6.8)
- Cisco SD-WAN (Viptela)
- Linux Server

This is the Front-end for Mobile SDWAN,

For the back-end code, please check:
https://github.com/CiscoOctopus/MobileSDWAN_Backend

## Description

This project is a PoC of a potential Mobile SDWAN solution powered by Cisco Orchestration tools (Requested by user)

Currently on Cisco SD-WAN side, the configuration needs to be preconfigured on vManage (NSO is not managing SD-WAN for current PoC)

This repo consist of two parts, the User administration and VPN Connection.

## How it works

By using service provided by the backend,
User administration support:
 - Create new VPN user
 - Modify/Delete existing VPN user
 - Check ASAv Server Info
 
 VPN connection support:
 - Check latency info
 - Launch Cisco anyconnect to Connect to VPN

## Demo Topology

![image](https://github.com/CiscoOctopus/MobileSDWAN_Backend/blob/master/topo.png?raw=true)

Note that we support multi-customer in this design, so each customer has it's own VMs under different SDWAN VPN.

Since this is a PoC right now, we only support IOS and Android mobile phone with CISCO anyconnect installed, we don't have public testbed available to use. You can follow the topology above to setup the topology.

## How to Run

**This is the frontend of MobileSDWAN, it dependent on the backend part, please install the [backend](https://github.com/CiscoOctopus/MobileSDWAN_Backend) first.**

> Note: It's highly recommended to follow along with the [tutorial guide](https://ionicframework.com/docs/react/your-first-app), which goes into more depth, but this is the fastest way to run the app. 

0) Install Ionic if needed: `npm install -g @ionic/cli`.
1) Clone this repository.
2) In a terminal, change directory into the repo.
3) Install all packages: `npm install`.
4) Run on the web: `ionic serve`.
5) Run on iOS or Android: See [here](https://ionicframework.com/docs/building/running).
6) Build and deploy: `ionic build`, and copy all files in build directory to the root of web server.
