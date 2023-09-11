import React, {useEffect, useRef, useState} from 'react';
import Footer from '../../components/Footer/Footer';
import { FcAudioFile, FcPlus } from "react-icons/fc";
import audioLogo from '../../assets/audio-logo.png'
import  youtubeLogo from "../../assets/youtube.svg"
const Workspace = () => {
    const [masterAudioUrl, setMasterAudioUrl] = useState(null);
    const [childAudioUrl, setChildAudioUrl] = useState(null);
    const [childAudioDataList, setChildAudioDataList] = useState([]);
    const [youtubeApi, setYoutubeApi] = useState(null);
    const [minute, setMinute] = useState('');
    const [second, setSecond] = useState('');
    const [complete, setComplete] = useState(false)

    const masterClickedRef = useRef(false);
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dbc7aucky",
            uploadPreset: "insertAudio"
        }, function(error, result){
            if(!error && result && result.event === "success"){
                const info = result?.info;
                if (masterClickedRef.current) {
                    setMasterAudioUrl(info);
                } else {
                    setChildAudioUrl(info);
                }
            }
        });
    }, [])
    const dbPostHandler = () => {
        const audioInfo = {
            masterAudioUrl: masterAudioUrl.secure_url,
            childAudioDataList,
            youtubeApi,
        }
        fetch("http://localhost:5000/info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(audioInfo),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((er) => console.log(er));

    }

    const cancelHandler = () => {
        setMasterAudioUrl(null);
        setChildAudioDataList([]);
        setYoutubeApi(null);
        setComplete(false);
    }
    const addHandler = (event) => {
        event.preventDefault()
        setYoutubeApi(event.target.youtubeAPI.value)
    }
    const addChildHandler = (event) => {
        event.preventDefault()

        const timeMinute = parseInt(minute);
        const timeSecond = parseInt(second);

        if (isNaN(timeMinute) || isNaN(timeSecond) || timeMinute < 0 || timeSecond < 0) {
            alert('Please enter valid positive numbers for minutes and seconds.');
            return;
        }
        const childAudioData = {
            url: childAudioUrl?.secure_url,
            min: timeMinute,
            sec: timeSecond,
            name: childAudioUrl?.original_filename,
        }
        setChildAudioDataList((prevDataList) => [...prevDataList, childAudioData]);
        // childAudioUrl = null;

        setMinute("");
        setSecond("");
    }

    return (
        <div className='mt-28 2xl:mt-36'>
            <div className="mb-10 2xl:mb-20"><h2 className="text-center text-4xl text-gray-50 font-bold">Audio Combiner</h2>
                <h2 className="text-center mt-3 text-gray-300">Use the audio combination to edit your music quickly.</h2>
            </div>
            <div className="px-20 flex justify-center">
                <div className={complete ? "hidden" : 'bg-[#2e313d] w-1/2 mx-auto py-10 rounded-xl 2xl:min-h-[540px]'}>

                    <div className='flex flex-col justify-center items-center 2xl:mt-10'>

                        {(masterAudioUrl && youtubeApi) && ( <>

                                <p className="text-lg text-center mb-5">Pick a child audio file for inserting the master file</p>
                                <button
                                    onClick={() => {
                                        widgetRef.current.open();
                                        masterClickedRef.current = false;
                                    }}
                                    className="flex justify-center items-center px-16 py-4 font-semibold border-solid border-2 border-blue-400 p-2 rounded-lg hover:border-red-200 hover:bg-[#1C1E25] hover:text-blue-400 bg-blue-100 text-gray-600 shadow-lg shadow-cyan-500/50"
                                >
                                    <FcPlus className=" mr-3 text-3xl"></FcPlus>Select Audio
                                </button>

                                <form onSubmit={addChildHandler}>
                                    <p className="text-lg text-center mt-5 mb-2">Enter inserting time minutes and seconds</p>
                                    <div className="w-4/5 mx-auto flex">
                                        <input
                                            type="text"
                                            placeholder="0 minute"
                                            value={minute}
                                            onChange={(e) => setMinute(e.target.value)}
                                            className="input input-bordered w-1/2 max-w-xs mr-3" required/>
                                        <input
                                            type="text"
                                            placeholder="0 second"
                                            value={second}
                                            onChange={(e) => setSecond(e.target.value)}
                                            className="input input-bordered w-1/2 max-w-xs" required/>
                                    </div>
                                    <div className='w-full text-center mt-5 '>
                                        <input className="btn btn-outline mr-5" type="submit" value="Add Child" />
                                        <button onClick={() => setComplete(true)} className={childAudioDataList.length > 0 ? "btn btn-outline" : "btn btn-disabled"} tabIndex="-1" role="button" aria-disabled="true">Upload Complete</button>
                                    </div>
                                </form>
                            </>
                        )}
                        {(!masterAudioUrl || !youtubeApi) && (<>
                            <p className="text-lg text-center mb-5">Pick a Master audio file</p>
                            <button
                                onClick={() => {
                                    widgetRef.current.open();
                                    masterClickedRef.current = true;
                                }}
                                className="flex justify-center items-center px-16 py-4 font-semibold border-solid border-2 border-blue-400 p-2 rounded-lg hover:border-red-200 hover:bg-[#1C1E25] hover:text-blue-400 bg-blue-100 text-gray-600 shadow-lg shadow-cyan-500/50"
                            >
                                <FcPlus className=" mr-3 text-3xl"></FcPlus>Choose file
                            </button>
                            <form onSubmit={addHandler}>
                                <div className="form-control w-full max-w-xs mt-5">
                                    <input type="text" name='youtubeAPI' placeholder="Youtube API" className="input input-bordered w-full max-w-xs" required/>
                                </div>
                                <div className='w-full text-center mt-5'>
                                    <input className="btn btn-outline" type="submit" value="Add" />
                                </div>
                            </form>
                        </>)}

                    </div>
                </div>
                <div className={(masterAudioUrl || youtubeApi) ? "bg-black w-1/2 mx-auto m-0 rounded-xl p-8 2xl:min-h-[540px]" : "hidden" }>
                    <div className=' flex flex-col justify-center items-center 2xl:mt-10'>
                        <h2 className="text-lg text-center mt-2 font-bold">Master Audio file</h2>
                        <div className="flex items-center w-full">
                            <img className="w-12" src={audioLogo} alt=""/>
                            {(masterAudioUrl?.original_filename) ? <p className="text-gray-400 ml-2 truncate ">{masterAudioUrl?.original_filename}</p> : <p className=" ml-2 text-red-500 font-semibold">Audio File Not Found</p>}
                        </div>
                        <div className="divider"></div>
                        <h2 className="text-lg text-center mt-5 font-bold">YouTube API</h2>
                        <div className="flex items-center w-full">
                            <img className="w-10" src={youtubeLogo} alt=""/>
                            {youtubeApi ? <p className="text-gray-400 ml-2 truncate ">{youtubeApi}</p> : <p className=" ml-2 text-red-500 font-semibold">Your youtube API is required</p>}
                        </div>
                        <div className="divider"></div>
                        <h2 className="text-lg text-center mt-5 font-bold mb-3">Child Audio file</h2>
                        <div className=" w-full">
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>File Name</th>
                                        <th></th>
                                        <th></th>
                                        <th>Inserted time</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                            {childAudioDataList.length > 0 ? (childAudioDataList[0]?.min || childAudioDataList[0]?.sec ? (
                                childAudioDataList.map((childAudioData, idx) => <>
                                    <div key={idx} className="overflow-x-auto">
                                        <table className="table">
                                            <thead>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <th>{idx + 1}</th>
                                                <td className="flex items-center">
                                                    <FcAudioFile className="text-3xl"></FcAudioFile>
                                                    {childAudioData.name ? (<p className="ml-2">{childAudioData?.name} name</p>) : (<p className="ml-2 text-red-500 ">Audio File Not found </p>)}
                                                </td>
                                                <td>{childAudioData.min} min</td>
                                                <td>{childAudioData.sec} sec</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </>)
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td  className="ml-2 text-red-500 font-semibold">Audio File Not found </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )) : (
                                <p className="ml-2 text-red-500 font-semibold">Audio File Not found (when array.length = 0)</p>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-evenly mt-10 mb-2">
                        <button onClick={dbPostHandler} className={complete ? "font-semibold border-solid border-2 border-blue-400 p-2 rounded-lg hover:border-red-200 hover:bg-[#1C1E25] hover:text-blue-400 bg-blue-200 text-black px-6 py-3 shadow-lg shadow-cyan-500/50" : "hidden"}>Convert & Upload YouTube</button>
                        <button onClick={cancelHandler} className={complete ? "font-semibold border-solid border-2 border-red-400 p-2 rounded-lg hover:border-red-200 hover:bg-[#1C1E25] hover:text-red-400 bg-red-200 text-black px-6 py-3 shadow-lg shadow-red-500/50" : "hidden"}>Cancel</button>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Workspace;