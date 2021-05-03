function timeToDeg(maxSeconds, currentSeconds)
{
    let perc = ((currentSeconds * 100) / maxSeconds) / 100;
    return (360 * perc) + "deg";
}

function secondsToTimer(seconds)
{
    let timeString = '';
    let date = new Date(0);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(seconds);
    if (date.getHours()) {
        timeString += ('0'+ date.getHours()).slice(-2) + ":";
    }
    timeString += ('0' + date.getMinutes()).slice(-2) + ":" + ('0' + date.getSeconds()).slice(-2);
    return timeString;
}

function initTimer()
{
    let maxTime = 1 * 60; // 25 minutes
    let currentTime = 0;
    setInterval( () => {
        if (currentTime >= maxTime)
            currentTime = 0;
        else
            currentTime += 1;
        document.getElementsByClassName('clock')[0].innerText = secondsToTimer(maxTime - currentTime);
        document.getElementsByClassName('timer')[0].style.setProperty('--rotation', timeToDeg(maxTime, currentTime));
    }, 1000); 
}

initTimer();