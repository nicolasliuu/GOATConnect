import React from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "../utils/api";
import { useState } from "react";
import { Person } from "../types/person";
// import { openai } from "../server/api/routers/person";
// import { Person } from '@prisma/client';

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "XXX",
});

export const openai = new OpenAIApi(configuration);

const ChinatPrompt = `Chinat Yu
Teaching assistant for Computer Science Innovation and Entrepreneurship
Johns Hopkins Whiting School of Engineering
Johns Hopkins Whiting School of Engineering
Hong Kong, Hong Kong SAR`;

function InputInfo() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const addPersonMutation = api.person.add.useMutation();
  // const getPersonConversationQuery =
  //   api.person.getAll.useQuery();
  // .useQuery({ prompt: ChinatPrompt });

  const addPerson = async () => {
    const person: Person = {
      name: "Bob",
      // prompt: "cool person from US doing swe",
      prompt: prompt,
    };

    const personWithId = await addPersonMutation.mutateAsync({
      person,
    });

    const conversationsResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Given the following description about the user: " +
        prompt +
        ", provide a list of coffee chat or conversation questions that the user can ask the person. These should be in list format",
      temperature: 0,
      max_tokens: 500,
    });
    // const getPersonConversationQuery = api.person.getConversationOpeners.useQuery({name: "Bob", prompt: prompt});
    // const conversation = await getPersonConversationQuery(person)
    console.log(conversationsResponse.data.choices[0]?.text);
    const response = conversationsResponse.data.choices[0]?.text;
    if (response) {
      setResponse(response);
    }
    console.log(personWithId);
    // await verificationMutation.mutateAsync({ number: "+14437224218" });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Your logic for submitting the prompt and getting the response from ChatGPT
    // ...
  };

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-[#FDF0EC]">
        <div className="h-3/4 w-3/4 rounded-lg bg-[#FFDE91] p-10 shadow-lg">
          <h1 className="text-center text-3xl font-extrabold text-[#2C1338]">
            Type anything about your
            <br></br> <del>potential</del>{" "}
            <span className="text-[#883955]">future</span> connection:{" "}
          </h1>
          <form onSubmit={handleSubmit} className="mt-6 h-screen">
            <textarea
              autoFocus
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mb-3 h-1/2 w-full resize-none rounded-md border border-gray-400 p-3 caret-black outline-none"
              style={{ minHeight: "32px" }}
              placeholder=" Enter your prompt here"
            />
            <button
              onClick={() => void addPerson()}
              type="submit"
              className="w-full rounded-md bg-[#883955] p-2 text-white hover:bg-[#4C3549]"
            >
              Get Response
            </button>
          </form>
          {response && (
            <div className="mt-10">
              <p className="text-lg font-medium">Response:</p>
              {response.split(/\r?\n/).map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              {/* //{" "} */}
              {/* <p className="text-gray-600">
                {response.split(/\r?\n/).join("\r\n")}
              </p> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default InputInfo;
