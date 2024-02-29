"use client";
import { useState, useEffect } from "react";
import RecentIcon from "../icons/recent";
import SortIcon from "../icons/sort";
import Add from "./Add";
import Detail from "./Detail";

export default function Notes({ patient, handleAddNote }) {
  const patientName = patient?.familyName || "";
  const [showDetail, setShowDetail] = useState(true);
  const [showRecentNotes, setShowRecentNotes] = useState(false);
  const [noteDetail, setNoteDetail] = useState({});
  const [notes, setNotes] = useState([]);
  const [recentNotes, setRecentNotes] = useState([]);
  const [sort, setSort] = useState(true);

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
    setSort(!bool);
  };
  const showRecent = () => {
    setShowRecentNotes(!showRecentNotes);
  };
  const toggleToRecent = () => {
    setShowRecentNotes(true);
    setNotes(patient?.PatientNote || []);
    setRecentNotes(patient?.recentNotes || []);
  };
  useEffect(() => {
    setNotes(patient?.PatientNote || []);
    setRecentNotes(patient?.recentNotes || []);
  }, [patient]);

  return (
    <>
      <div className="notes flex-1 h-full p-4 flex-grow p-5 border-x border-gray-300">
        <div className="flex gap-3">
          <div className="notes-title flex-1">
            <p className="text-2xl font-medium text-white tracking-tight">
              {!showRecentNotes ? "Notes" : "Recent Notes"}
            </p>
            <span className="text-gray-800 text-white tracking-tight">
              {!showRecentNotes ? notes?.length : recentNotes?.length} Notes
            </span>
          </div>
          <SortIcon
            sortNotes={() => toggleSort(sort)}
            className="cursor-pointer"
          />
          <RecentIcon showRecent={() => showRecent()} />
          <button
            type="button"
            onClick={hideNoteDetail}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            + New Note
          </button>
        </div>

        {!showRecentNotes
          ? sort
            ? notes.reverse().map((note, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => showNoteDetail(note)}
                    className="notes-list text-white mt-3 p-3"
                  >
                    <div className="notes-list-name flex justify-between font-normal">
                      <p>{note[2]}</p>
                      <span className="text-xs">{pipeDate(note[0])}</span>
                    </div>
                    <div className="notes-list-description text-xs text-gray-400">
                      {addEllipsis(note[3], 100)}
                    </div>
                  </div>
                );
              })
            : notes.sort().map((note, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => showNoteDetail(note)}
                    className="notes-list text-white mt-3 p-3"
                  >
                    <div className="notes-list-name flex justify-between font-normal">
                      <p>{note[2]}</p>
                      <span className="text-xs">{pipeDate(note[0])}</span>
                    </div>
                    <div className="notes-list-description text-xs text-gray-400">
                      {addEllipsis(note[3], 100)}
                    </div>
                  </div>
                );
              })
          : recentNotes.map((note, index) => {
              return (
                <>
                  <div
                    key={index}
                    onClick={() => showNoteDetail(note)}
                    className="notes-list text-white mt-3 p-3"
                  >
                    <div className="notes-list-name flex justify-between font-normal">
                      <p>{note[2]}</p>
                      <span className="text-xs">{pipeDate(note[0])}</span>
                    </div>
                    <div className="notes-list-description text-xs text-gray-400">
                      {addEllipsis(note[3], 100)}
                    </div>
                  </div>
                </>
              );
            })}
      </div>
      {showDetail ? (
        <Detail noteDetail={noteDetail} patientName={patientName} />
      ) : (
        <Add handleAddNote={addNote} />
      )}
    </>
  );
}
