const FOCUS = 'focus';
const SHORT_BREAK = 'short-break';
const LONG_BREAK = 'long-break';

const TIMERS = {
    [FOCUS]: .2 * 60,
    [SHORT_BREAK]: .2 * 60,
    [LONG_BREAK]: .2 * 60
};

const TIMER_LABELS = {
    [FOCUS]: 'Focus',
    [SHORT_BREAK]: 'Short Break',
    [LONG_BREAK]: 'Long Break'
};

var currentLoop = 1;
var isRunning = false;
var startMoment = null;
var currentPomodoro = () => {
    return Math.abs(currentLoop / 8); // Takes 8 loops to completed a pomodoro
}

/* INIT */
setTimerText( secondsToTimer(getCurrentTimer() || 0) );
setTimerSubText(getCurrentTimerText());

window.timerInterval = setInterval( () => {
    tickTimer();
}, 100);
/* END INIT */


function startTimer()
{
    startMoment = new Date();
    isRunning = true;
    setTimerSubText(getCurrentTimerText());
}

function cancelTimer()
{
    startMoment = null;
    isRunning = false;

    setRotation('0deg');
    setTimerText(secondsToTimer(getCurrentTimer() || 0));
    setTimerSubText(getCurrentTimerText());
}

function nextLoop()
{
    currentLoop++;
    cancelTimer();
}

function finishTimer()
{
    playAlarm();
    startMoment = null;
    isRunning = false;
    currentLoop++;
    setTimerText('Finished!');
    setTimerSubText('Continuing...');
    toggleRingTransition(false);
    setTimeout(() => {
        setRotation('0deg');
        setTimeout(() => {
            toggleRingTransition(true);
        }, 250);
    }, 250);

    setTimeout( () => {
        startTimer();
    }, 1000)
}

function tickTimer()
{
    if (!isRunning)
        return false;

    let maxTime = getCurrentTimer();
    let currentTime = Math.abs((new Date().getTime() - startMoment.getTime()) / 1000); // Diff in seconds
    if (currentTime >= maxTime) {
        finishTimer();
        return;
    }
    updateUI(maxTime, currentTime);
}

function updateUI(maxTime, currentTime)
{
    setRotation(timeToDeg(maxTime, currentTime));
    let timer = secondsToTimer(maxTime - currentTime);
    setTimerText(timer);
    setTitle(`🕑 ${timer} - Focus Time!`);

    let currentLoopProgress = timeToPercentual(maxTime, currentTime);
    let currentTimerID = getCurrentTimerIdentifier();
    document.getElementsByClassName('timer')[0].classList = `timer ${currentTimerID}`;
    switch (currentTimerID) {
        case FOCUS:
            if ((currentLoop + 1) % 8 == 0) {
                document.getElementById('labelFocus2').style.setProperty('--fill', `${currentLoopProgress}%`);
                document.getElementById('labelFocus2').classList = 'label active';

                document.getElementById('labelFocus').style.setProperty('--fill', `100%`);
                document.getElementById('labelFocus').classList = 'label completed';

                document.getElementById('labelShort').style.setProperty('--fill', `100%`);
                document.getElementById('labelShort').classList = 'label completed';
            } else {
                document.getElementById('labelFocus').style.setProperty('--fill', `${currentLoopProgress}%`);
                document.getElementById('labelFocus').classList = 'label active';

                document.getElementById('labelShort').style.setProperty('--fill', `0%`);
                document.getElementById('labelShort').classList = 'label';

                document.getElementById('labelFocus2').style.setProperty('--fill', `0%`);
                document.getElementById('labelFocus2').classList = 'label';
            }

            document.getElementById('labelLong').style.setProperty('--fill', `0%`);
            document.getElementById('labelLong').classList = 'label';
            break;
        case SHORT_BREAK:
            document.getElementById('labelFocus').style.setProperty('--fill', `100%`);
            document.getElementById('labelFocus').classList = 'label completed';

            document.getElementById('labelShort').style.setProperty('--fill', `${currentLoopProgress}%`);
            document.getElementById('labelShort').classList = 'label active';

            document.getElementById('labelLong').style.setProperty('--fill', `0%`);
            document.getElementById('labelLong').classList = 'label';
            break;
        case LONG_BREAK:
            document.getElementById('labelFocus').style.setProperty('--fill', `100%`);
            document.getElementById('labelFocus').classList = 'label completed';

            document.getElementById('labelShort').style.setProperty('--fill', `100%`);
            document.getElementById('labelShort').classList = 'label completed';

            document.getElementById('labelFocus2').style.setProperty('--fill', `100%`);
            document.getElementById('labelFocus2').classList = 'label completed';

            document.getElementById('labelLong').style.setProperty('--fill', `${currentLoopProgress}%`);
            document.getElementById('labelLong').classList = 'label active';
            break;
    }
}

// Helpers
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

function timeToPercentual(maxSeconds, currentSeconds, normalized = false)
{
    return ((currentSeconds * 100) / maxSeconds) / (normalized ? 100 : 1);
}

function timeToDeg(maxSeconds, currentSeconds)
{
    return (360 * timeToPercentual(maxSeconds, currentSeconds, true)) + "deg";
}

function toggleRingTransition(enabled = true)
{
    if (enabled)
        document.getElementsByClassName('marker')[0].classList.remove('no-transition');
    else
        document.getElementsByClassName('marker')[0].classList.add('no-transition');
}

function playAlarm()
{
    var audio = new Audio('/audio/alarm.mp3');
    audio.play();
}

// Getters
function getCurrentTimerIdentifier()
{
    return currentLoop % 8 == 0 ? LONG_BREAK : (currentLoop % 2 === 0 ? SHORT_BREAK : FOCUS);
}

function getCurrentTimer()
{
    return TIMERS[ getCurrentTimerIdentifier() ];
}

function getCurrentTimerText()
{
    return TIMER_LABELS[ getCurrentTimerIdentifier() ];
}

// Setters
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

function setTitle(text)
{
    document.getElementsByTagName('title')[0].innerText = text;
}