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
    new ClipboardJS("button");
    editDiv.current.focus();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>URLS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <input
        placeholder="paste URL here"
        ref={editDiv}
        onInput={async (e) => setURL(await fixURL(e.currentTarget.value))}
      ></input>
      {URL ? (
        <>
          <div id="out">{URL}</div>
          <div id="out">{removeQueryString(URL)}</div>
        </>
      ) : (
        <div>Invalid URL</div>
      )}
      <button data-clipboard-target="#out" />
    </div>
  );
}
