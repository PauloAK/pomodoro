const FOCUS = .1 * 60;
const SHORT_BREAK = .1 * 60;
const LONG_BREAK  = .1 * 60;

var currentTimerLoop = 0;
var startMoment = null;
var isRunning = false;

function startTimer()
{
    currentTimerLoop++;
    startMoment = new Date;
    isRunning = true;
    setTimerSubText(getCurrentTimerText());
}

function cancelTimer()
{
    currentTimerLoop--;
    startMoment = null;
    isRunning = false;

    setRotation('0deg');
    setTimerText(secondsToTimer(getCurrentTimer() || 0));
    setTimerSubText(getCurrentTimerText());
}

function finishTimer()
{
    startMoment = null;
    isRunning = false;
    setRotation('360deg');
    setTimerText('Finished!');
    setTimerSubText('');
}

function tickTimer()
{
    document.getElementById('loop').value = currentTimerLoop;
    if (!isRunning)
        return false;

    let maxTime = getCurrentTimer();
    let currentTime = Math.abs((new Date().getTime() - startMoment.getTime()) / 1000);

    if (currentTime >= maxTime) {
        finishTimer();
        return;
    }

    setRotation(timeToDeg(maxTime, currentTime));
    setTimerText(secondsToTimer(maxTime - currentTime));
}

function timeToDeg(maxSeconds, currentSeconds)
{
    let normalizedPercentual = ((currentSeconds * 100) / maxSeconds) / 100;
    return (360 * normalizedPercentual) + "deg";
}

function secondsToTimer(seconds)
{
    let timeString = '';
    let date = new Date(0);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(seconds);
    if (date.getHours()) 
        timeString += ('0'+ date.getHours()).slice(-2) + ":";
    timeString += ('0' + date.getMinutes()).slice(-2) + ":" + ('0' + date.getSeconds()).slice(-2);
    return timeString;
}

function getCurrentTimer()
{
    if (currentTimerLoop == 0)
        return FOCUS;
    else
        return currentTimerLoop % 8 == 0 ? LONG_BREAK : (currentTimerLoop % 2 === 0 ? SHORT_BREAK : FOCUS);
}

function getCurrentTimerText()
{
    if (currentTimerLoop == 0)
        return 'Focus';
    else
        return currentTimerLoop % 8 == 0 ? 'Long Break' : (currentTimerLoop % 2 === 0 ? 'Short Break' : 'Focus');
}

function setRotation(deg)
{
    document.getElementsByClassName('timer')[0].style.setProperty('--rotation', deg);
}

function setTimerText(text)
{
    document.getElementsByClassName('clock')[0].innerText = text;
}

function setTimerSubText(text)
{
    document.getElementsByClassName('subText')[0].innerText = text;
}


setRotation('0deg');
setTimerText( secondsToTimer(getCurrentTimer() || 0) );
setTimerSubText(getCurrentTimerText());
window.timerInterval = setInterval( () => {
    tickTimer();
}, 100);

document.getElementById('startTimer').addEventListener('click', () => {
    startTimer();
});

document.getElementById('cancelTimer').addEventListener('click', () => {
    cancelTimer();
});