import { useRef } from "react";
import DiscardIcon from "../icons/discard";
import DownloadIcon from "../icons/download";
export default function Add({ handleAddNote }) {
  const formRef = useRef();
  const titleRef = useRef();
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
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    return formattedDateTime;
  }
  const handleForm = () => {
    const form = formRef.current;
    const titleInput = titleRef.current;
    const title = titleInput.value;
    const description = form[0].value;
    if (title && description) {
      let noteData = { title, description };
      handleAddNote(noteData);
      titleInput.value = "";
      form[0].value = "";
    } else {
      alert("Please Add title and Description");
    }
  };
  const resetForm = () => {
    const form = formRef.current;
    const titleInput = titleRef.current;
    form[0].value = "";
    titleInput.value = "";
  };
  return (
    <>
      <div className="notes flex-1 h-full rounded-r-xl flex-grow">
        <div className="flex justify-between border-b-2 border-[#4A4B4B] p-4">
          <div className="notes-title flex flex-col">
            <input
              ref={titleRef}
              className="text-2xl font-medium text-white bg-transparent outline-none"
              placeholder="Note Title"
            />
            <div
              className="text-white tracking-tight text-sm"
              style={{ marginTop: "4px" }}
            >
              <span className="text-[#7F7F7F]">Added on :</span> {currentDate()}
            </div>
          </div>
          <div className="notes-meta flex gap-2 justify-between">
            <button
              onClick={handleForm}
              type="button"
              class="text-white gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
            >
              <DownloadIcon className="" /> Save
            </button>
            <button
              type="button"
              onClick={resetForm}
              class="text-white gap-2 bg-grey-700 hover:bg-grey-800 border border-slate-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
            >
              <DiscardIcon />
              Discard
            </button>
          </div>
        </div>
        <div className="text-white mt-3 p-3 h-full">
          <form ref={formRef} className="flex flex-col gap-3 h-full">
            <textarea
              name="description"
              placeholder="Note description"
              className="text-xs text-gray-400 w-full h-1/2 bg-transparent rounded-md p-3 outline-none"
              defaultValue=""
            ></textarea>
          </form>
        </div>
      </div>
    </>
  );
}
