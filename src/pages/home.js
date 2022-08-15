import { useNavigate} from 'react-router-dom';
import { MetaContext, } from '../contexts';
import { useContext, useState} from 'react';

function Home() {
	const navigate = useNavigate();
	const sdp = useContext(MetaContext);

	return (<>
		<div className="h-screen overflow-hidden bg-[#282c34] flex justify-center">
			<div className="flex items-center h-screen">
				<div className="items-center text-center">
					<button disabled={sdp.username === "" ? true : false} className="disabled:bg-[#282c34] bg-sky-300 hover:bg-sky-400 px-5 py-2.5 w-250 text-sm leading-5 rounded-md font-semibold text-white" onClick={() => {navigate("/streamWebCam", )}}>Web Camera</button>
					<br />
					<br />
					<button disabled={sdp.username === "" ? true : false} className="disabled:bg-[#282c34] bg-green-300 hover:bg-green-400 px-5 py-2.5 w-250 text-sm leading-5 rounded-md font-semibold text-white" onClick={() => {navigate("/streamLocVideo", )}}>Local Video</button>
					<br />
					<br />
					<textarea readOnly={false} onChange={(event) => { sdp.setUsername( event.target.value); }} rows={1} cols={20} type="text" name="click the below button to generate offer ..." id="username" className="px-3 py-2 mx-auto text-white align-middle border bg-sky-500 bg-slate-700 placeholder:italic placeholder:text-slate-200 border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm disabled:bg-slate-50 disabled:text-white-500 disabled:border-white-200 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none" value={sdp.username} placeholder="First name yourself here ..." >
					</textarea>
				</div>
			</div>
		</div>
	</>);

}

export { Home };
