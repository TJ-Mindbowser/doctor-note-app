import { useRef } from "react";
import DiscardIcon from "../icons/discard";
import DownloadIcon from "../icons/download";
export default function Add({ handleAddNote }) {
  const formRef = useRef();
  function currentDate() {
    const date = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "2-digit",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const formattedDateTime = `${formattedDate} | ${formattedTime}`;
    return formattedDateTime;
  }
  const handleForm = () => {
    const form = formRef.current;
    const title = form[0].value;
    const description = form[1].value;
    if (title && description) {
      let noteData = { title, description };
      handleAddNote(noteData);
      form[0].value = "";
      form[1].value = "";
    } else {
      alert("Please Add title and Description");
    }
  };
  const resetForm = () => {
    const form = formRef.current;
    form[0].value = "";
    form[1].value = "";
  };
  return (
    <>
      <div className="notes flex-1 h-full p-4 rounded-r-xl flex-grow p-5">
        <div className="flex justify-between">
          <div className="notes-title">
            <p className="text-2xl font-medium text-white tracking-tight">
              New Note
            </p>
            <span className="text-gray-800 text-white tracking-tight">
              Added on: {currentDate()}
            </span>
          </div>
          <div className="notes-meta flex justify-between">
            <button
              onClick={handleForm}
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
            >
              <DownloadIcon className="mr-1" />
            </button>
            <button
              type="button"
              onClick={resetForm}
              class="text-white bg-grey-700 hover:bg-grey-800 border border-slate-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
            >
              <DiscardIcon />
            </button>
          </div>
        </div>
        <div className="text-white mt-3 p-3 h-full">
          <form ref={formRef} className="flex flex-col gap-3 h-full">
            <input
              name="title"
              className="text-xs text-gray-400 w-full h-15 bg-transparent border rounded-md p-3"
              placeholder="Note title"
            ></input>
            <textarea
              name="description"
              placeholder="Note description"
              className="text-xs text-gray-400 w-full h-1/2 bg-transparent border rounded-md  p-3"
              defaultValue=""
            ></textarea>
          </form>
        </div>
      </div>
    </>
  );
}
