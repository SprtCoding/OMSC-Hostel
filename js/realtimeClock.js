function rlClock() {
    const today = new Date()
    const month = today.getMonth()
    const year = today.getFullYear()
    const day = today.getDay()
    const daym = today.getDate()
    const dayArray = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
    const monthArray = new Array("January","February","March","April","May","June","July","August","September","October","November","December")

    const current_date = `${dayArray[day]} ${monthArray[month]} ${daym}, ${year}`

    const hours = addZero(today.getHours())
    const minutes = addZero(today.getMinutes())
    const seconds = addZero(today.getSeconds())

    var amPm = (hours < 12) ? "AM" : "PM";
    var hrs = (hours > 12) ? hours - 12 : hours;

    if(hours == 0) {
        hrs = 12
    }

    const current_time = `${hrs}:${minutes}:${seconds}`

    const dateNow = document.getElementById('dateNow')

    dateNow.innerText = current_date + " | " + current_time + " " + amPm

    // const currentTimeAndDate = document.getElementById('dateNowModal')

    // const dateNowModalReserved = document.getElementById('dateNowModalReserved')

    // const dateNowModalCheck = document.getElementById('dateNowModalCheck')

    // const dateNowModalReservedDetails = document.getElementById('dateNowModalReservedDetails')

    // const dateNowModalCheckDetails = document.getElementById('dateNowModalCheckDetails')

    // currentTimeAndDate.innerHTML = current_date + " | " + current_time + " " + amPm
    // dateNowModalReserved.innerHTML = current_date + " | " + current_time + " " + amPm
    // dateNowModalReservedDetails.innerHTML = current_date + " | " + current_time + " " + amPm
    // dateNowModalCheck.innerHTML = current_date + " | " + current_time + " " + amPm
    // dateNowModalCheckDetails.innerHTML = current_date + " | " + current_time + " " + amPm

    var t = setTimeout(rlClock, 500);
}

function addZero(num) {
    return num < 10 ? `0${num}` : num
}