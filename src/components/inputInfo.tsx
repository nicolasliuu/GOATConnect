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
    <div className="w-full h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] flex items-center justify-center">
      <div className="w-1/2 p-10 bg-white shadow-lg">
        <h1 className="text-2xl font-medium mb-6 text-center">GOATConnect</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            className="border border-gray-400 p-2 w-full mb-6 h-32"
            placeholder="Enter your prompt here"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-full hover:bg-blue-600"
          >
            Get Response
          </button>
        </form>
        {response && (
          <div className="mt-6">
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
