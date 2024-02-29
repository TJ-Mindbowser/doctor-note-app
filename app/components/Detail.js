export default function Detail({ noteDetail, patientName }) {
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
  return (
    <>
      {noteDetail.length && (
        <div className="notes flex-1 h-full p-4 rounded-r-xl flex-grow p-5 border ">
          <div className="flex justify-between">
            <div className="notes-title">
              <p className="text-2xl font-medium text-white tracking-tight">
                {patientName}
              </p>
              <div className="text-white tracking-tight text-sm mt-4">
                <span className="text-gray-400">Added on :</span>{" "}
                {pipeDate(noteDetail[0])} |
                <span className="text-gray-400"> Last modified :</span>
                {pipeDate(noteDetail[1])}
              </div>
            </div>
          </div>
          <div className="notes-list text-white mt-3 p-3">
            <div className="notes-list-description text-xs text-gray-400">
              {noteDetail[3]}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
