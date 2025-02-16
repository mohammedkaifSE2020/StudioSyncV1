import React, { useState, useRef } from 'react';
import pic from '../../assets/logo.png';
import './screen.css'
import {Link} from 'react-router-dom'

function ScreenRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  let recordedChunks = [];

  const startScreenRecording = async () => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      if (!videoRef.current) {
        console.error("videoRef is null.");
        return;
      }

      streamRef.current = displayStream;
      videoRef.current.srcObject = displayStream;
      videoRef.current.play();

      const mediaRecorder = new MediaRecorder(displayStream);
      mediaRecorderRef.current = mediaRecorder;

      recordedChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        console.log("Recording stopped, creating blob...");
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        setVideoBlob(blob);

        const previewURL = URL.createObjectURL(blob);
        setVideoURL(previewURL);

        if (videoRef.current) {
          videoRef.current.srcObject = null; // Stop live preview
        }
      };

      mediaRecorder.start();
      setIsRecording(true); // Update state to show "Stop Recording" button
    } catch (error) {
      console.error("Error starting screen recording:", error);
    }
  };

  const stopScreenRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsRecording(false);
  };

  const downloadRecording = () => {
    if (!videoBlob) return;

    const url = URL.createObjectURL(videoBlob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'screen-recording.webm';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const deleteRecording = () => {
    setVideoBlob(null);
    setVideoURL(null);
    alert('Video deleted successfully!');
  };

  return (
    <>
      <div className="header flex items-center justify-start gap-10 ml-10 mt-10">
        <img src={pic} alt="Logo" />
        <h1 className="font-bold text-black text-3xl mx-1 tracking-wider">STUDIO SYNC</h1>
        <div className="menu">
          <ul className=" ml-96 header flex items-center justify-start gap-10 ml-10 mt-10 text-2xl font-bold">
            <Link to={'/workspace'}>
              <li>Workspace</li>
            </Link>
            <Link to={'/logout'}>
              <li>Logout</li>
            </Link>
          </ul>
        </div>
      </div>

      <div className="flex items-start justify-around gap-2">
        <div className="left flex items-start justify-around flex-col text-white m-0 p-0">
          <h1 className="w-3/6 text-4xl font-bold ml-20 tracking-wider leading-relaxed">
            ✨ Capture every moment seamlessly with just a click—start recording now!
          </h1>
        </div>
        <div className="button">
          {isRecording ? (
            <button
              onClick={stopScreenRecording}
              className="mr-72 mt-64 h-24 w-64 px-10 py-5 text-2xl font-bold"
            >
              Stop Sharing
            </button>
          ) : (
            <button
              onClick={startScreenRecording}
              className="mr-72 mt-64 h-24 w-64 px-10 py-5 text-2xl font-bold"
            >
              Start Recording
            </button>
          )}
        </div>
      </div>

      <div className="preview ml-20 font-bold text-black text-3xl mx-1 tracking-wider">
        Live Video Preview
        <video
          ref={videoRef}
          autoPlay
          muted
          style={{ width: '90%', height: 'auto', backgroundColor: 'black' }}
          className='mb-10'
        ></video>

        {/* Playback Video */}
        {videoBlob && videoURL && (
          <div className="my-10">
            <h2 className="font-bold text-black text-3xl mx-1 tracking-wider">Recorded Video</h2>
            <video
              src={videoURL}
              controls
              style={{ width: '90%' }}
            ></video>
          </div>
        )}

        {/* Buttons for Download and Delete */}
        {videoBlob && (
          <div className="flex items-center justify-start my-10 gap-5">
            <button
              className="mb-6 h-24 w-72 px-10 py-5 text-2xl font-bold tracking-wider hover:text-white"
              onClick={downloadRecording}
            >
              Download Recording
            </button>
            <button
              className="mb-6 h-24 w-72 px-10 py-5 text-2xl font-bold tracking-wider hover:text-white"
              onClick={deleteRecording}
            >
              Delete Video
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ScreenRecorder;
