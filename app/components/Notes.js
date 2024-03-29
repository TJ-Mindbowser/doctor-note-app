"use client";
import { useState, useEffect, useReducer } from "react";
import RecentIcon from "../icons/recent";
import SortIcon from "../icons/sort";
import Add from "./Add";
import Detail from "./Detail";
import ClipBoardIcon from "../icons/clipboard";
import AddIcon from "../icons/add";

export default function Notes({ patient, handleAddNote }) {
  const patientName = patient?.familyName || "";
  const [showDetail, setShowDetail] = useState(true);
  const [showRecentNotes, setShowRecentNotes] = useState(false);
  const [noteDetail, setNoteDetail] = useState({});
  const [notes, setNotes] = useState([]);
  const [recentNotes, setRecentNotes] = useState([]);
  const [sort, setSort] = useState(true);
  const [selectedNote, setSelectedNote] = useState();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  function addEllipsis(str, limit) {
    if (str.length > limit) {
      return str.slice(0, limit) + "...";
    }
    return str;
  }
  /**
   * Function to pipe date
   * @param {*} timestamp
   * @returns
   */
  function pipeDate(timestamp) {
    const date = new Date(timestamp);
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

  const showNoteDetail = (note) => {
    setShowDetail(true);
    setNoteDetail(note);
  };
  const hideNoteDetail = () => {
    setShowDetail(false);
  };
  const addNote = (noteData) => {
    handleAddNote({ ...noteData, patientName }, toggleToRecent);
  };
  const toggleSort = (bool) => {
    // setSort(!bool);
    let newNote = notes;
    newNote.reverse();
    setNotes([...newNote]);
  };
  const showRecent = () => {
    setShowRecentNotes(!showRecentNotes);
  };
  const toggleToRecent = () => {
    // setShowRecentNotes(true);
    setNotes(patient?.PatientNote || []);
    setRecentNotes(patient?.recentNotes || []);
    forceUpdate();
  };
  useEffect(() => {
    setNotes(patient?.PatientNote?.reverse() || []);
    setRecentNotes(patient?.recentNotes?.reverse() || []);
  }, [patient]);

  return (
    <>
      <div className="notes flex-1 h-full flex-grow border-x border-[#4A4B4B]">
        <div className="flex gap-3 border-b-2 border-[#4A4B4B] p-4 items-center">
          <div className="notes-title flex-1">
            <p className="text-2xl font-medium text-white tracking-tight">
              {!showRecentNotes ? "Notes" : "Recent Notes"}
            </p>
            {patientName && (
              <span className="text-[#7F7F7F] tracking-tight">
                {!showRecentNotes ? notes?.length : recentNotes?.length} Notes
              </span>
            )}
          </div>
          {patientName && (
            <>
              <SortIcon
                sortNotes={() => toggleSort(sort)}
                className="cursor-pointer"
              />
              <RecentIcon showRecent={() => showRecent()} />
              <button
                style={{ padding: "12px" }}
                type="button"
                onClick={hideNoteDetail}
                class="text-white flex items-center gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <AddIcon /> New Note
              </button>
            </>
          )}
        </div>
        {!notes.length && <ClipBoardIcon />}
        <div className="p-3">
          {!showRecentNotes
            ? notes.map((note, index) => {
                return (
                  <>
                    <div
                      key={index}
                      onClick={() => {
                        showNoteDetail(note);
                        setSelectedNote(index);
                      }}
                      className={`notes-list text-white p-9 rounded-xl ${
                        index === selectedNote ? "list-active" : ""
                      }`}
                    >
                      <div className="notes-list-name flex justify-between font-normal">
                        <p>{note[2]}</p>
                        <span className="text-xs text-[#7F7F7F]">
                          {pipeDate(note[0])}
                        </span>
                      </div>
                      <div className="notes-list-description text-xs text-[#7F7F7F]">
                        {addEllipsis(note[3], 100)}
                      </div>
                    </div>
                    <hr
                      className={`${index === selectedNote ? "hidden" : ""}`}
                    />
                  </>
                );
              })
            : recentNotes.map((note, index) => {
                return (
                  <>
                    <div
                      key={index}
                      onClick={() => {
                        showNoteDetail(note);
                        setSelectedNote(index);
                      }}
                      className={`notes-list text-white p-9 rounded-xl ${
                        index === selectedNote ? "list-active" : ""
                      }`}
                    >
                      <div className="notes-list-name flex justify-between font-normal">
                        <p>{note[2]}</p>
                        <span className="text-xs text-[#7F7F7F]">
                          {pipeDate(note[0])}
                        </span>
                      </div>
                      <div className="notes-list-description text-xs text-[#7F7F7F]">
                        {addEllipsis(note[3], 100)}
                      </div>
                    </div>
                    <hr
                      className={`${index === selectedNote ? "hidden" : ""}`}
                    />
                  </>
                );
              })}
        </div>
      </div>

      {showDetail ? (
        <Detail noteDetail={noteDetail} patientName={patientName} />
      ) : (
        <Add handleAddNote={addNote} />
      )}
    </>
  );
}
