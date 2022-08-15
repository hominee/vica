import './App.css';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

import { MetaContext, Constant } from './contexts';
import React from 'react';
import {Home,  StreamWebCam, StreamLocVideo } from './pages';

class App extends React.Component {
	  constructor(props) {
    super(props);

    this.setTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === Constant.theme.dark
            ? Constant.theme.light
            : Constant.theme.dark,
      }));
    };

		this.setOffer = (offer) => {
			this.setState(() => ({
				offer: offer
			}));
		};

		this.setOffered = (b) => {
			this.setState(() => ({
				offered: b
			}));
		};

		this.setAnswer= (answer) => {
			this.setState(() => ({
				answer: answer
			}));
		};

		this.setUsername= (name) => {
			this.setState(() => ({
				username: name
			}));
		};

		this.setAnswered = () => {
			this.setState(() => ({
				answered: true
			}));
		};

		this.setIsLogin = () => {
			console.log("successfully login", );
			this.setState(() => ({
				isLogin: true
			}));
		};

		this.peerLocHandle = (cb) => {
			this.setState(cb(this.state.peerLoc));
		};

		this.peerLocObjHandle = (cb) => {
			this.setState(cb(this.state.peerLocObj));
		};

		this.peerRemHandle = (cb) => {
			this.setState( cb(this.state.peerRem));
		};

		this.state = {
			peerLoc: Constant.peerLoc,
			peerLocHandle: this.peerLocHandle,
			peerLocObj: Constant.peerLocObj,
			peerLocObjHandle: this.peerLocObjHandle,
			peerRem: Constant.peerRem,
			peerRemHandle: this.peerRemHandle,
      theme: Constant.theme.light,
      setTheme: this.toggleTheme,
			sdp: Constant.sdp,
			setOffer: this.setOffer,
			setOffered: this.setOffered,
			setAnswer: this.setAnswer,
			setAnswered: this.setAnswered,
			isLogin: false,
			setIsLogin: this.setIsLogin,
			username: Constant.username,
			setUsername: this.setUsername,
    };
  }

	render() {
		return (
		<MetaContext.Provider value={this.state}>
			<React.StrictMode>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} /> 
						<Route path="/streamWebCam" element={<StreamWebCam />} /> 
						<Route path="/streamLocVideo" element={<StreamLocVideo />} /> 
					</Routes>
				</BrowserRouter>
			</React.StrictMode>
		</MetaContext.Provider >
	);
	}

}

export default App;
