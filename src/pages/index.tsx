import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import InputInfo from "../components/inputInfo";

import { api } from "../utils/api";
import axios from 'axios';

//const apiKey = process.env.OPENAI_API_KEY;
const apiKey = "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";
// var searchprompt = "";

const Home: NextPage = (props: any) => {

  return (
    <>
      <Head>
        <title>GOATConnect</title>
        <meta name="description" content="Generated by goatConnect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#883955] to-[#4c3549]">
        <InputInfo></InputInfo>
        {/* <InputInfo> include var searchprompt here </InputInfo> */}
      </main>
    </>
  );
};

export default Home;

// export async function fetchResponse() {
//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/engines/davinci/jobs",
//       {
//         prompt: "Given the following description about the user: " + searchprompt + ", provide a list of coffee chat or conversation questions that the user can ask the person. These should be in list format, and between every question, include a <br/>.",
//         max_tokens: 100,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${apiKey}`
//         }
//       }
//     );
//     return response.data.choices[0].text;
//   } catch (error) {
//     console.error(error);
//   }

