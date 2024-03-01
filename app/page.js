"use client";
import { useState, useEffect, useReducer } from "react";
import Notes from "./components/Notes";
import Patients from "./components/Patient";
import Loader from "./components/Loader";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [patientNotes, setPatientNotes] = useState([]);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  useEffect(() => {
    fetchNotes();
  }, []);
  /**
   * Fetch notes from the mockable server call
   */
  const fetchNotes = async () => {
    try {
      const API = "http://demo9104628.mockable.io/notes";
      const response = await fetch(API);
      const data = await response.json();
      setNotes(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log("🚀 ~ fetchNotes ~ error:", error);
    }
  };
  /**
   * Search by name
   */
  const searchUser = (name) => {
    if (name) {
      let search = notes.filter((o) => {
        let lowerCasedName = o.familyName.toLowerCase();
        return lowerCasedName.indexOf(name) > -1;
      });
      setNotes(search);
    } else {
      fetchNotes();
    }
  };
  /**
   * Function to get patient note list
   * @param {*} patientId
   */
  const getPatientNotes = (index) => {
    setPatientNotes(notes[index]);
  };

  const handleAddNote = (noteObj, action) => {
    const { patientName } = noteObj;
    let noteData = [];
    noteData[0] = Date.now();
    noteData[1] = Date.now();
    noteData[2] = noteObj.title;
    noteData[3] = noteObj.description;
    let userData = notes.filter((note) => note.familyName === patientName);
    userData[0].PatientNote.unshift(noteData);
    if (userData[0]?.recentNotes) {
      userData[0]?.recentNotes.unshift(noteData);
    } else {
      userData[0].recentNotes = [noteData];
    }
    setNotes(notes);
    forceUpdate()
    action();
  };

  return (
    <main>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-20">
          <div className="wrapper flex justify-between items-stretch rounded-xl h-screen">
            <Patients
              data={notes}
              handleSearch={searchUser}
              fetchNotes={getPatientNotes}
            />
            <Notes patient={patientNotes} handleAddNote={handleAddNote} />
          </div>
        </div>
      )}
    </main>
  );
}
