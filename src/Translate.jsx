import React, { useEffect, useState } from "react";
import availableLanguages from "./languages.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowDownUpAcrossLine,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./index.css";

const Translate = () => {
  const [languages, setLanguages] = useState([]);
  const [text, setText] = useState("");
  const [selected, setSelected] = useState("en");
  const [translatedText, setTranslatedText] = useState("");
  const options = {
    method: "POST",
    url: "https://microsoft-translator-text.p.rapidapi.com/translate",
    params: {
      "to[0]": selected,
      "api-version": "3.0",
    },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "8425a8bfe6mshd01d9504d2c7feep16d95ejsn3bf87ebd51c8",
      "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
    },
    data: [
      {
        Text: text,
      },
    ],
  };
  const detectandTranslate = async () => {
    if (text != "") {
      try {
        const response = await axios.request(options);
        setTranslatedText(...response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleTextInput = (e) => {
    const newContent = e.target.textContent;
    setText(newContent);
  };
  const handleClipboard = async (e, param) => {
    e.preventDefault();
    const content = document.querySelector(`.${param}`).innerText;
    await navigator.clipboard
      .writeText(content)
      .then(() => {
        console.log("copied to clipboard");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const handleSelected = (e) => {
    e.preventDefault();
    setSelected(e.target.value);
  };
  const handleReadAloud = (e, param) => {
    e.preventDefault();
    let synth = window.speechSynthesis;
    const content = document.querySelector(`.${param}`).innerText;
    console.log(content);
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = 0.75;
    synth.cancel();
    synth.speak(utterance);
    let r = setInterval(() => {
      console.log(synth.speaking);
      if (!synth.speaking) {
        clearInterval(r);
      } else {
        synth.pause();
        synth.resume();
      }
    }, 14000);
  };
  const handlePaste = (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };
  useEffect(() => {
    setLanguages(Object.entries(availableLanguages.translation));
  }, []);

  return (
    <section className="flex flex-col min-h-[500px] min-w-[500px] justify-center space-y-2 bg-gray-900 pb-5">
      {/* First box for input */}
      <div className="  w-11/12 mx-auto focus-within:bg-gray-800 flex flex-col px-2 py-2 rounded-md border-2 transition-all duration-700 focus-within:border-blue-600 border-[#56565694]">
        <div className="justify-between flex w-full py-3">
          <form className="flex justify-between space-x-5 items-center w-full">
            <select
              id="underline_select"
              class="py-2.5 px-2 text-md  bg-transparent border-0 border-b-2 text-gray-400 border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option selected key="default">
                Detect Language
              </option>
              {languages.map(([code, lang]) => (
                <option className="py-1" key={code} value={code}>
                  {lang.name} &mdash; {lang.nativeName}
                </option>
              ))}
            </select>
            <span className="text-gray-500 text-md pr-3 flex space-x-3">
              <button
                className="group"
                onClick={(e) => handleClipboard(e, "textToTranslate")}
              >
                <FontAwesomeIcon
                  className=" group-hover:text-blue-600 transition-all duration-700"
                  icon={faClipboard}
                />
              </button>
              <button
                className="group"
                onClick={(e) => handleReadAloud(e, "textToTranslate")}
              >
                <FontAwesomeIcon
                  className=" group-hover:text-blue-600 transition-all duration-700"
                  icon={faVolumeHigh}
                />
              </button>
            </span>
          </form>
        </div>
        <p
          contentEditable="true"
          aria-placeholder="Enter text to translate"
          spellCheck="false"
          textcontent={text}
          onInput={handleTextInput}
          onPaste={handlePaste}
          className=" bg-transparent border-0 text-lg outline-0 text-left textToTranslate font-mont text-gray-100 h-32 overflow-y-scroll w-full"
        ></p>
      </div>
      {/* translate button */}
      <div className="w-full  relative flex justify-center items-center">
        <button
          onClick={detectandTranslate}
          className="absolute -bottom-5 rounded-full bg-gray-900 border-[#56565694] border w-fit text-gray-400 hover:text-white px-3 py-2 transition-all duration-700 pulseb"
        >
          <FontAwesomeIcon icon={faArrowDownUpAcrossLine} />
        </button>
      </div>
      {/* second box for output */}
      <div className="w-11/12 mx-auto justify-start flex flex-col space-y-3">
        <div className="w-full flex flex-col px-2 py-2 rounded-md border-2 transition-all duration-700 focus-within:border-blue-600 border-[#56565694]">
          <div className="justify-between flex w-full py-3">
            <form className="flex justify-between space-x-5 items-center w-full">
              <select
                value={selected}
                onChange={handleSelected}
                id="underline_select"
                class="py-2.5 px-2 text-md  bg-transparent border-0 border-b-2 text-gray-400 border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                {languages.map(([code, lang]) => (
                  <option className="py-1" key={code} value={code}>
                    {lang.name} &mdash; {lang.nativeName}
                  </option>
                ))}
              </select>
              <span className="text-gray-500 text-md pr-3 flex space-x-3">
                <button
                  className="group"
                  onClick={(e) => handleClipboard(e, "translated")}
                >
                  <FontAwesomeIcon
                    className=" group-hover:text-blue-600 transition-all duration-700"
                    icon={faClipboard}
                  />
                </button>
                <button
                  className="group"
                  onClick={(e) => handleReadAloud(e, "translated")}
                >
                  <FontAwesomeIcon
                    className=" group-hover:text-blue-600 transition-all duration-700"
                    icon={faVolumeHigh}
                  />
                </button>
              </span>
            </form>
          </div>
          {translatedText && (
            <p className=" justify-start translated text-left font-mont text-lg text-gray-100 max-h-56 overflow-y-scroll">
              {translatedText.translations[0].text}
            </p>
          )}
        </div>
        {translatedText && (
          <p className="text-white text-sm text-left">
            Translated from{" "}
            <span className="text-blue-500">
              {" "}
              {
                languages.find(
                  (lang) => lang[0] === translatedText.detectedLanguage.language
                )?.[1]?.name
              }
            </span>
          </p>
        )}
      </div>
    </section>
  );
};

export default Translate;
