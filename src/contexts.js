import React from 'react';

const PeerConnectionLoc = new RTCPeerConnection({
	iceServers: [{
		urls: "stun:stun.stunprotocol.org"
	}],
	listenIps: [
		{
			ip:  '192.168.123.56' || process.env.MEDIASOUP_LISTEN_IP,
			announcedIp: process.env.MEDIASOUP_ANNOUNCED_IP
		}
	],
});
PeerConnectionLoc.onicecandidate = (e) => {
	if (e.candidate) { 
		//console.log("ice candidata", e);
		/*
		 *PeerConnectionLoc.addIceCandidate(e.candidate).then(
		 *  () => {
		 *  console.log("receive ice candidata", e.candidate);
		 *  },
		 *  err => {
		 *    console.log("failed to set ice candidata", err);
		 *});
		 */
		Constant.peerLocObj.candidate.push(e.candidate);
		console.log("candidates:", Constant.peerLocObj.candidate);
	}
}
const PeerConnectionRem = new RTCPeerConnection({
	iceServers: [{
		urls: "stun:stun.stunprotocol.org"
	}],
	listenIps: [
		{
			ip: process.env.MEDIASOUP_LISTEN_IP || '192.168.1.197',
			announcedIp: process.env.MEDIASOUP_ANNOUNCED_IP
		}
	],
});

const Constant = {
	peerLoc: PeerConnectionLoc,
	peerRem: PeerConnectionRem,
	peerLocObj: {
		candidate: []
	},
	sdp: {
		offer: '',
		offered: false,
		answer: '',
		answered: false,
	},
	theme: {
		dark: {
			bg: "black-300",
			text: "white-300",
		},
		light: {
			bg: "white-300",
			text: "black-300",
		},
	},
	username: '',
};

const SdpOfferLength = 512;
const SdpAnswerLength = 512;

const MetaContext = React.createContext(
	{
		peerLoc: Constant.peerLoc,
		peerLocHandle: () => {},
		peerLocObj: Constant.peerLocObj,
		peerLocObjHandle: () => {},
		pcRem: Constant.peerRem,
		peerRemHandle: () => {},
		sdp: Constant.sdp,
		setOffer: () => {},
		setOffered: () => {},
		setAnswer: () => {},
		setAnswered: () => {},
		theme: Constant.theme,
		setTheme: () => {},
		isLogin: false,
		setIsLogin: () => {},
		username: Constant.username,
		setUsername: () => {},
	}
);

export { MetaContext, Constant, SdpOfferLength, SdpAnswerLength };
