"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

const page = () => {
  const [password, setPassword] = useState("");
  const [length, setlength] = useState(6);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const passwordRef = useRef(null)
  const copyPassword =  ()=>{
    passwordRef.current?.select();
    navigator.clipboard.writeText(password)
  }
  useEffect(() => {

    passGenerator()
  }, [length, numAllowed, charAllowed, passGenerator])
  return (
    <div className="bg-gray-800 w-full max-w-md mx-auto shadow-md rounded-lg text-orange-500 px-3 py-4 my-10">
      <h1 className="text-white text-center font-bold my-3">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          className="outline-none w-full py-1 px-3"
          type="text"
          readOnly
          value={password}
          ref={passwordRef}
          placeholder="Password"
        />
        <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={copyPassword}>
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            className="cursor-pointer"
            min={6}
            max={100}
            onChange={(e) => {
              setlength(e.target.value);
            }}
          />
          <label>Length:({length})</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label>Number</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label>Characters</label>
        </div>
      </div>
    </div>
  );
};

export default page;
