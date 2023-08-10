const convertISO = (date) =>{
    let dateObj = new Date(date)
    let convertedDay = String(dateObj.getDate()).padStart(2,0)
    let convertedDate = String(dateObj.getMonth()+1).padStart(2,0)
    let convertedYear = String(dateObj.getFullYear())
    let convertedHour = String(dateObj.getHours() % 12 || 12)
    let convertedMinute = String(dateObj.getMinutes()).padStart(2,0)
    let amOrPm = convertedHour >= 12 ? "AM" : "PM";
    return `${convertedDay}-${convertedDate}-${convertedYear}-${convertedHour}-${convertedMinute}-${amOrPm}`
}

module.exports = convertISO;