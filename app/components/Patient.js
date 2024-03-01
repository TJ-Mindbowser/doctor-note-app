import { useState } from "react";

export default function Patients({ data, handleSearch, fetchNotes }) {
  const [selected, setSelected] = useState();
  const handleForm = (e) => {
    handleSearch(e.toLowerCase());
  };
  return (
    <div className="patient h-full p-4 rounded-l-xl">
      <div className="patient-title">
        <p className="text-2xl font-medium text-white tracking-tight">
          Patients
        </p>
        <span className="text-gray-800 text-white tracking-tight">
          {data.length || 0} {data.length > 1 ? "Patients" : "Patient"}
        </span>
      </div>
      <div className="patient-search mt-3">
        {/* <form onSubmit={handleForm} className="max-w-md h-1/5"> */}
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            onChange={(e) => handleForm(e.target.value)}
            className="block h-1 p-4 ps-10 text-sm placeholder-transparent::placeholder text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search By Patient Name"
          />
        </div>
        {/* </form> */}
      </div>
      <div className="patient-list text-white mt-3">
        {data.map((user, index) => {
          return (
            <p
              key={index}
              onClick={() => {
                fetchNotes(index);
                setSelected(index);
              }}
              className={`w-full p-1 rounded-xl normal-case ${
                index === selected ? "list-active" : ""
              }`}
            >
              {user.familyName}
            </p>
          );
        })}
      </div>
    </div>
  );
}
