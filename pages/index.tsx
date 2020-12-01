import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import ClipboardJS from "clipboard";

async function fixURL(url: string): Promise<string | false> {
  const res = await fetch("/api/followurl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
  if (res.ok) {
    const json = await res.json();
    return json.url;
  } else {
    return false;
  }
}

function removeQueryString(url: string): string {
  return url.split(/[?#]/)[0];
}

export default function Home() {
  const [URL, setURL] = useState<string | false>("");
  const editDiv = useRef<HTMLInputElement>(null);
  useEffect(() => {
    new ClipboardJS("div");
    editDiv.current.focus();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Head>
        <title>URLS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <input
        className="p-2 border border-gray-400"
        placeholder="paste URL here"
        ref={editDiv}
        onInput={async (e) => setURL(await fixURL(e.currentTarget.value))}
      ></input>
      {URL ? (
        <div className="mt-5">
          <div
            className="max-w-md p-3 bg-gray-100 break-all cursor-pointer mb-3"
            data-clipboard-target="#out"
            id="out"
          >
            {removeQueryString(URL)}
          </div>
          <div
            className="max-w-md p-3 bg-gray-100 break-all cursor-pointer text-gray-500"
            data-clipboard-target="#out2"
            id="out2"
          >
            {URL}
          </div>
        </div>
      ) : (
        <div className="text-red-500">Invalid URL</div>
      )}
    </div>
  );
}
