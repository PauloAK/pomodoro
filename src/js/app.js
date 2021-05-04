let main = new Main();

function startTimer()
{
    setDisabled('startTimer', true);
    setDisabled('pauseTimer', false);
    setDisabled('cancelTimer', false);
    main.pomodoro.start();
}

function cancelTimer()
{
    setDisabled('startTimer', false);
    setDisabled('pauseTimer', true);
    setDisabled('cancelTimer', true);
    main.pomodoro.reset();
}

function pauseTimer()
{
    main.pomodoro.pause();
}

function nextTimer()
{
    setDisabled('startTimer', false);
    setDisabled('pauseTimer', true);
    setDisabled('cancelTimer', true);
    main.pomodoro.next();
}

function setDisabled(id, isDisabled = true)
{
    if (!isDisabled)
        document.getElementById(id).removeAttribute('disabled');
    else
        document.getElementById(id).setAttribute('disabled', isDisabled);
}