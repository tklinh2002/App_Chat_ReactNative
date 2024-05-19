export const formatTime = (dateString: string) => {
  if (dateString == null) return null;
  const now = new Date();
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("-").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);

  const specificDate = new Date(year, month - 1, day, hour, minute, second);

  const timeDifference = specificDate.getTime() - now.getTime();

  const seconds = Math.abs(Math.floor(timeDifference / 1000));
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) {
    return `${days} ngày`;
  } else if (hours > 0) {
    return `${hours} giờ`;
  } else {
    return `${minutes} phút`;
  }
};


export const formatTimeMess = (dateString: string)=>{
const  date = dateString.split(" ")
const hours = date[1].split(":")[0]
const minutes = date[1].split(":")[1]
const day = date[0].split("-")[0]
const month = date[0].split("-")[1]
const year = date[0].split("-")[2].slice(2,4)
const formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`;

return formattedDate
}