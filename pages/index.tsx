import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import ClipboardJS from "clipboard";

async function fixURL(url: string): Promise<string> {
  const res = await fetch("/api/followurl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  }).then((r) => r.json());
  return res.url ? res.url.split(/[?#]/)[0] : "";
}

export default function Home() {
  const [URL, setURL] = useState("");
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
      <div id="out">{URL}</div>
      <button data-clipboard-target="#out" />
    </div>
  );
}
