import React from 'react';
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "../utils/api";
import { useState } from 'react';

function InputInfo() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      // Your logic for submitting the prompt and getting the response from ChatGPT
      // ...
    };
  
  return (
    <>
    <div className="w-full h-screen bg-[#FDF0EC] flex items-center justify-center">
      <div className="w-3/4 h-3/4 p-10 bg-[#FFDE91] shadow-lg rounded-lg">
        <h1 className="text-3xl font-extrabold text-center text-[#2C1338]">Type anything about your 
         <br></br> <del>potential</del> <span className="text-[#883955]">future</span> connection: </h1>
        <form onSubmit={handleSubmit} className='mt-6 h-screen'>
          <textarea
            autoFocus
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            className="border border-gray-400 p-3 w-full mb-3 h-1/2 caret-black outline-none resize-none rounded-md"
            style={{ minHeight: "32px" }}
            placeholder=" Enter your prompt here"
          />
          <button
            
            type="submit"
            className="bg-[#883955] text-white p-2 w-full hover:bg-[#4C3549] rounded-md"
          >
            Get Response
          </button>
        </form>
        {response && (
          <div className="mt-10">
            <p className="text-lg font-medium">Response:</p>
            <p className="text-gray-600">{response}</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default InputInfo;
