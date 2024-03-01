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
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    return formattedDateTime;
  }
  return (
    <>
      {noteDetail.length && (
        <div className="notes flex-1 h-full rounded-r-xl flex-grow">
          <div
            className="flex justify-between border-b-2 border-[#4A4B4B]"
            style={{ padding: "13px 32px" }}
          >
            <div className="notes-title">
              <p className="text-2xl font-medium text-white tracking-tight">
                {patientName}
              </p>
              <div
                className="text-white tracking-tight text-sm"
                style={{ marginTop: "10px" }}
              >
                <span className="text-[#7F7F7F]">Added on :</span>{" "}
                {pipeDate(noteDetail[0])} |
                <span className="text-[#7F7F7F]"> Last modified :</span>
                {pipeDate(noteDetail[1])}
              </div>
            </div>
          </div>
          <div className="text-white mt-3 p-3" style={{ padding: "0px 32px" }}>
            <div className="text-xs text-[#7F7F7F]">{noteDetail[3]}</div>
          </div>
        </div>
      )}
    </>
  );
}
