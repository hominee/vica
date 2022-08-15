import { useNavigate} from 'react-router-dom';
import { MetaContext, } from '../contexts';
import {useState, useContext, useRef} from 'react';

function StreamLocVideo() {
	const videoSrc = useRef(null);
	const videoSrcLoc = useRef(null);
	const playBtnRef = useRef(null);
	const localMedia = useRef(null);
	const [muted, setMuted] = useState(false);
	const [paused, setPaused] = useState(false);
	const [toolbar, setToolbar] = useState(true);
	const [headbar, setHeadbar] = useState(true);
	const [inLogin, setInLogin] = useState(false);
	const [inPlaying, setInPlaying] = useState(false);
	const [genInvalid, setGenInvalid] = useState(false);
	const [offerCreate, setOfferCreate] = useState(false);
	const [offerReceive, setOfferReceive] = useState(false);
	const [answerCreate, setAnswerCreate] = useState(false);
	const [answerReceive, setAnswerReceive] = useState(false);
	const navigate = useNavigate();
	const sdp = useContext(MetaContext);
	const streamStop = (event) => {
		let video = event.current.srcObject;
		let tracks = video.getTracks();
		tracks.forEach((s,_, __) => s.stop());
		event.current.srcObject = null
	};

	return (
		<div className="w-screen h-screen overflow-hidden bg-[#282c34]">
			<div className="flex flex-col justify-center w-screen h-screen">
				<video id="webcam-remote"  ref={videoSrc} className="object-cover w-full h-screen" autoPlay={true}> </video>
			</div>

				<div className="fixed bottom-3 right-3 opacity-70">
					<video id="webcam-local" style={{height: "200px", width: "267px"}} ref={videoSrcLoc} onEnded={() => console.log("stream ended")} className="object-scale-down w-full h-auto" src="" autoPlay={true} > 
					</video>
				</div>
			<div style={{display: inLogin ? "none" : ""}} className="absolute flex items-center justify-center w-full content-evenly bottom-20 ">
				<div className={toolbar ? "flex w-1/3 justify-evenly" : "flex w-1/3 justify-evenly opacity-0"} onMouseOver={() => toolbar === false ? setToolbar(true) : {}} onMouseLeave={() => setTimeout(() => toolbar === true ? setToolbar(false) : {}, 1500 )} >

					<button ref={playBtnRef} className="text-lg font-semibold rounded-sm bg-slate hover:opacity-70 disabled:opacity-50" onClick={() => {
						let filename = localMedia.current.files[0];
						if (!inPlaying) {
							console.log("start playing", filename);
							let fileUrl = window.URL.createObjectURL(filename);
							videoSrcLoc.current.src = fileUrl;
							videoSrcLoc.current.play();
							setPaused(!paused);
							setInPlaying(true);
						} else if (inPlaying && paused) {
							console.log("just pause ");
							videoSrcLoc.current.pause();
							setPaused(!paused);
						} else if (inPlaying && !paused) {
							console.log("just play ");
							videoSrcLoc.current.play();
							setPaused(!paused);
						} else {
							console.log("not valid");
						}
				}}>
						{paused ? 
						<svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 20 20" fill="white">
								<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
							</svg>
						: <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 20 20" fill="white">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
						</svg>
						}
				</button>

			<button className="text-lg font-semibold rounded-sm bg-slate hover:opacity-70 disabled:opacity-50" onChange={(event) => {
				videoSrcLoc.current.pause();
				videoSrcLoc.current.src = '';
				setInPlaying(false);
				setPaused(false);
			} } onClick={() => {
				localMedia.current.parentElement.reset();
				localMedia.current.click();
				//localMedia.current.type = "video/mp4";
				//localMedia.current.src = "1.mp4";
			} }>
				<svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 20 20" fill="white">
					<path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
					<path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
				</svg>
				<form className="hidden">
					<input type="file" accept="video/*" ref={localMedia} />
				</form>
			</button>

			<button disabled={true} className="text-lg font-semibold rounded-sm bg-slate hover:opacity-70 disabled:opacity-50" onClick={() => {
				console.log("chat currently not supported yet");
				} }>
				<svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 20 20" fill="white">
					<path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
					<path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
				</svg>
			</button>

			<button className="text-lg font-semibold rounded-sm bottom-20 bg-slate-0 hover:opacity-70 disabled:opacity-50" onClick={() => {
				let muted = !videoSrcLoc.current.muted;
				videoSrcLoc.current.muted = muted;
				setMuted(muted);
				console.log("successfully change the mute state");
			}}>
				{!muted ? 
					<svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 20 20" fill="white">
						<path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
					</svg>
					: <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 20 20" fill="white">
						<path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
					</svg>
				}
				</button>

			<button className="text-lg font-semibold rounded-sm bottom-20 bg-slate-0 hover:opacity-70 disabled:opacity-50" onClick={() => {
				sdp.peerLocHandle((pc) => { 
					let senders = pc.getSenders();
					senders.forEach((sender) => pc.removeTrack(sender));
				});
				let stream = videoSrc.current.srcObject;
				if (stream) { streamStop(videoSrc) }
				let streamLoc = videoSrcLoc.current.srcObject;
				if (streamLoc) { streamStop(videoSrcLoc) }
				setMuted(false);
				setToolbar(true);
				setPaused(false);
				localMedia.current.value = null;
				videoSrcLoc.current.pause();
				videoSrcLoc.current.src = '';
				sdp.setOffer("");
				sdp.setOffered(false);
				sdp.setAnswer("");
				sdp.setAnswered(false);
			}}>
					<svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 20 20" fill="red">
  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
</svg>
				</button>

				</div>
			</div>

			<div style={{display: inLogin ? "none" : "", opacity: headbar ? 100 : 0 }} className="absolute top-0 flex w-full place-content-between content-evenly" onMouseOver={() => headbar === false ? setHeadbar(true) : null} onMouseLeave={() => setTimeout(() => headbar === true ? setHeadbar(false) : null, 1500 )} >
				<button className="px-3 py-1.5 flex-row" onClick={() => {navigate("/", {replace: true})}}>
					<svg xmlns="http://www.w3.org/2000/svg" className="bg-[#282c34] w-6 h-6" viewBox="0 0 20 20" fill="gray">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
					</svg>
				</button>
				<div className="flex flex-row">
					<div className="">
						<button className="bg-[#282c34] opacity-30 hover:opacity-75 hover:bg-[#282c34] mr-3  px-5 py-2.5 w-250 text-sm leading-5 rounded-md font-semibold text-white" onClick={() => {
							setInLogin(true);
							setOfferCreate(true);
						}}>Create</button>
						<button className="bg-[#282c34] opacity-30 hover:opacity-75 over:bg-[#282c34] ml-3 px-5 py-2.5 w-250 text-sm leading-5 rounded-md font-semibold text-white" onClick={() => {
							setInLogin(true);
							setOfferReceive(true);
						}}>Join</button>
					</div> : 
					{
						sdp.username === "" ? null :
					<span className="text-white font-bold text-sm px-5 py-2.5 opacity-30 opacity-75"> { sdp.username } </span>
					}
				</div>
			</div>

			<div style={{display: inLogin && offerCreate ? "" : "none"}} className="absolute flex flex-col items-center justify-center my-auto left-1/3 top-1/4 columns-1 ">
				<button className="absolute top-0 left-0" onClick={() => {
					setOfferCreate(false);
					setInLogin(false);
				}}>
					<svg xmlns="http://www.w3.org/2000/svg" className="bg-[#282c34] w-6 h-6" viewBox="0 0 20 20" fill="gray">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
					</svg>
				</button>
				<form onSubmit={(event) => event.preventDefault()} className="flex-col items-center justify-center my-auto text-center align-middle">
					<label className="block my-3 text-lg font-semibold text-center text-white">Offer</label>
					<textarea readOnly={ sdp.offered } onChange={(event) => { sdp.setOffer( event.target.value) }} rows={5} cols={50} type="text" name="offer" id="offer" className="px-3 py-2 mx-auto text-white align-middle border bg-slate-700 placeholder:italic placeholder:text-slate-200 border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm disabled:bg-slate-50 disabled:text-white-500 disabled:border-white-200 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none" value={sdp.offer} placeholder="click the below button to generate offer ..." >
					</textarea>
					<span style={{display: genInvalid ? "" : "none"}} className="flex ml-0 text-xs text-left text-red-500">
					* Offer must contains candidates, wait it or do it again if not response for a while!
					</span>
					<div className="flex w-2/3 mx-auto place-content-evenly ">
						<button style={{width: "130px"}} className="px-5 py-2.5 my-3 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-700 w-250 rounded-md" onClick={() => { 
							setGenInvalid(false); 
							let stream ;
								if (videoSrcLoc.current.captureStream) {
									stream = videoSrcLoc.current.captureStream();
								} else if (videoSrcLoc.current.mozCaptureStream) {
									stream = videoSrcLoc.current.mozCaptureStream();
								} else {
									console.log("captureStream not supported");
								}
							if (stream) {
								sdp.peerLocHandle((pc) => {
									stream.getTracks()
										.forEach((track) => 
										pc.addTrack(track, stream) 
									);
									pc.ontrack = (event) => {
										// FIXME display multiple streams 
										videoSrc.current.srcObject = event.streams[0];
										//videoSrc.current.play();
										//console.log("get stream track:", event);
									}
									pc.createOffer({
										'offerToReceiveAudio': true,
										'offerToReceiveVideo': true    
									}).then((res) => {
										pc.setLocalDescription(res);
										console.log("Offer successfully created", pc);
										let content = JSON.stringify(res);
										if (content.indexOf("candidate") === -1 ) { setGenInvalid(true); }
										sdp.setOffer(content);
										sdp.setOffered(true);
									}).catch((e) => {
										console.log("Offer failed to create", e);
										sdp.setOffer("");
										sdp.setOffered(false);
									});
									pc.onicegatheringstatechange = (event) => {
										if (event.target.iceGatheringState === "complete") {
											let content2 = JSON.stringify(pc.localDescription);
											if (content2.indexOf("candidate") === -1 ) { setGenInvalid(true); } else { setGenInvalid(false); }
											sdp.setOffer(content2);
											sdp.setOffered(true);
											}
									};
								});
							} else {
								console.log("stream not init");
							}

						} }>Create Offer</button>
						<button style={{width: "130px"}} disabled={ !sdp.offered } className="px-5 py-2.5 my-3 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-700 w-250 rounded-md disabled:bg-[#282c34] disabled:opacity-75" onClick={() => {
							setOfferCreate(false);
							setAnswerReceive(true);
						}}>Next</button>
					</div>
				</form>
			</div>

			<div style={{display: inLogin && answerReceive ? "" : "none"}} className="absolute flex flex-col items-center justify-center my-auto left-1/3 top-1/4 columns-1 ">
				<button className="absolute top-0 left-0" onClick={() => {
					setAnswerReceive(false);
					setOfferCreate(true);
				}}>
					<svg xmlns="http://www.w3.org/2000/svg" className="bg-[#282c34] w-6 h-6" viewBox="0 0 20 20" fill="gray">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
					</svg>
				</button>
			<form onSubmit={(event) => event.preventDefault()} className="flex-col items-center justify-center my-auto text-center align-middle">
        <label className="block my-3 text-lg font-semibold text-center text-white">Answer</label>
				<textarea readOnly={false} onChange={(event) => { sdp.setAnswer( event.target.value) }} rows={5} cols={50} type="text" name="answerReceive" id="answerReceive" className="px-3 py-2 mx-auto text-white align-middle border bg-slate-700 placeholder:italic placeholder:text-slate-200 border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm disabled:bg-slate-50 disabled:text-white-500 disabled:border-white-200 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none" value={sdp.answer} placeholder="paste remote peer's answer here ..." >
				</textarea>
				<div className="flex w-full mx-auto place-content-evenly ">
					<button style={{width: "150px"}} className="px-5 py-2.5 my-3 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-700 w-250 rounded-md" onClick={() => { 
						sdp.peerLocHandle((pc) => {
							pc.ontrack = (event) => {
								// FIXME display multiple streams 
									videoSrc.current.srcObject = event.streams[0];
									//videoSrc.current.play();
									console.log("get stream track:", event);
							}
						});
						sdp.peerLocHandle((pc) => {
							pc.setRemoteDescription(JSON.parse(sdp.answer)).then(() => {
								sdp.setAnswered(true);
						    console.log("Answer successfully received", pc);
							}).catch((e) => {
						    console.log("Answer failed to set", e);
						    sdp.setAnswered(false);
							});
						});
					} }>Receive Answer</button>
					<button style={{width: "130px"}} disabled={ !sdp.answered } className="px-5 py-2.5 my-3 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-700 w-250 rounded-md disabled:bg-[#282c34] disabled:opacity-75" onClick={() => {
						setAnswerReceive(false);
						setInLogin(false);
						sdp.setIsLogin();
						//let filename = localMedia.current.files[0];
						//console.log("name:", filename);
						//let fileUrl = window.URL.createObjectURL(filename);
						//videoSrcLoc.current.src = fileUrl;
						if (!inPlaying) {
							playBtnRef.current.click();
						}
						videoSrc.current.play();
					}}>Finish</button>
				</div>
			</form>
			</div>

			<div style={{display: inLogin && offerReceive ? "" : "none"}} className="absolute flex flex-col items-center justify-center my-auto left-1/3 top-1/4 columns-1 ">
				<button className="absolute top-0 left-0" onClick={() => {
					setOfferReceive(false);
					setInLogin(false);
				}}>
					<svg xmlns="http://www.w3.org/2000/svg" className="bg-[#282c34] w-6 h-6" viewBox="0 0 20 20" fill="gray">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
					</svg>
				</button>
			<form onSubmit={(event) => event.preventDefault()} className="flex-col items-center justify-center my-auto text-center align-middle">
        <label className="block my-3 text-lg font-semibold text-center text-white">Offer</label>
				<textarea onChange={(event) => { sdp.setOffer( event.target.value) }} rows={5} cols={50} type="text" name="offerReceive" id="offerReceive" className="px-3 py-2 mx-auto text-white align-middle border bg-slate-700 placeholder:italic placeholder:text-slate-200 border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm disabled:bg-slate-50 disabled:text-white-500 disabled:border-white-200 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none" value={sdp.offer} placeholder="paste remote peer's offer here ..." >
				</textarea>
				<div className="flex w-2/3 mx-auto place-content-evenly ">
					<button style={{width: "130px"}} className="bg-green-500 hover:bg-green-700 px-5 py-2.5 my-3 text-sm font-semibold text-white w-250 rounded-md" onClick={() => { 
						sdp.peerLocHandle((pc) => {
							pc.ontrack = (event) => {
								// FIXME display multiple streams 
								videoSrc.current.srcObject = event.streams[0];
								//videoSrc.current.play();
								console.log("get stream track:", event);
							}
							pc.setRemoteDescription(JSON.parse(sdp.offer)).then(() => {
								sdp.setOffered(true);
						    console.log("Offer successfully received", pc);
							}).catch((e) => {
						    console.log("Offer failed to set", e);
						    sdp.setOffered(false);
							});
						});
					} }>Receive Offer</button>
					<button style={{width: "130px"}} disabled={ !sdp.offered } className="px-5 py-2.5 my-3 text-sm font-semibold text-white bg-green-500 hover:bg-green-700 disabled:bg-[#282c34] disabled:opacity-75 w-250 rounded-md" onClick={() => {
						setOfferReceive(false);
						setAnswerCreate(true);
					}}>Next</button>
				</div>
			</form>
			</div>

			<div style={{display: inLogin && answerCreate ? "" : "none"}} className="absolute flex flex-col items-center justify-center my-auto left-1/3 top-1/4 columns-1 ">
				<button className="absolute top-0 left-0" onClick={() => {
					setAnswerCreate(false);
					setOfferReceive(true);
				}}>
					<svg xmlns="http://www.w3.org/2000/svg" className="bg-[#282c34] w-6 h-6" viewBox="0 0 20 20" fill="gray">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
					</svg>
				</button>
			<form onSubmit={(event) => event.preventDefault()} className="flex-col items-center justify-center my-auto text-center align-middle">
        <label className="block my-3 text-lg font-semibold text-center text-white">Answer</label>
				<textarea readOnly={ sdp.answered } onChange={(event) => { sdp.setAnswer( event.target.value) }} rows={5} cols={50} type="text" name="AnswerCreate" id="AnswerCreate" className="px-3 py-2 mx-auto text-white align-middle border bg-slate-700 placeholder:italic placeholder:text-slate-200 border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm disabled:bg-slate-50 disabled:text-white-500 disabled:border-white-200 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none" value={sdp.answer} placeholder="click the below button to generate answer ..." >
				</textarea>
				<div className="flex w-full mx-auto place-content-evenly ">
					<button style={{width: "150px"}} className="bg-green-500 hover:bg-green-700 px-5 py-2.5 my-3 text-sm font-semibold text-white w-250 rounded-md" onClick={() => { 
							let stream ;
							//let maybeCreateStream = () => {
							//};
								//if (stream) {return;}
								if (videoSrcLoc.current.captureStream) {
									stream = videoSrcLoc.current.captureStream();
									console.log("captureStream supported");
								} else if (videoSrcLoc.current.mozCaptureStream) {
									stream = videoSrcLoc.current.mozCaptureStream();
									console.log("mozcaptureStream supported");
								} else {
									console.log("captureStream not supported");
								}
							//videoSrcLoc.oncanplay = maybeCreateStream;
							if (stream) {
								sdp.peerLocHandle((pc) => {
									stream.getTracks()
										.forEach((track) => 
										pc.addTrack(track, stream) 
								);
								})
								sdp.peerLocHandle((pc) => {
									pc.ontrack = (event) => {
										// FIXME display multiple streams 
										videoSrc.current.srcObject = event.streams[0];
										//videoSrc.current.play();
										//console.log("get stream track:", event);
									}
									pc.createAnswer({
										'offerToReceiveAudio': true,
										'offerToReceiveVideo': true    
									}).then((res) => {
										pc.setLocalDescription(res);
										console.log("Answer successfully created", pc);
										sdp.setAnswer(JSON.stringify(res));
										sdp.setAnswered(true);
									}).catch((e) => {
										console.log("Answer failed to create", e);
										sdp.setAnswer("");
										sdp.setAnswered(false);
									})
									pc.onicegatheringstatechange = (event) => {
										if (event.target.iceGatheringState === "complete") {
											let content2 = JSON.stringify(pc.localDescription);
											if (content2.indexOf("candidate") === -1 ) { setGenInvalid(true); } else { setGenInvalid(false); }
											sdp.setAnswer(content2);
											sdp.setAnswered(true);
											//pc.setLocalDescription(JSON.parse(content2));
											//console.log("create answer finished", content2);
										}
									};
								});
							} else {
								console.log("stream not init");
							}
					} }>Create Answer</button>
					<button style={{width: "150px"}} disabled={ !sdp.answered } className="bg-green-500 hover:bg-green-700 px-5 py-2.5 my-3 text-sm font-semibold text-white w-250 rounded-md disabled:bg-[#282c34] disabled:opacity-75" onClick={() => {
						sdp.setIsLogin();
						setAnswerCreate(false);
						setInLogin(false);
						playBtnRef.current.click();
						videoSrc.current.play();
					}}>Finish</button>
				</div>
			</form>
			</div>

		</div>
	);
}

export default StreamLocVideo;

