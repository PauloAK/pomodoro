let main=new Main;function startTimer(){setDisabled("startTimer",!0),setDisabled("pauseTimer",!1),setDisabled("cancelTimer",!1),main.pomodoro.start()}function cancelTimer(){setDisabled("startTimer",!1),setDisabled("pauseTimer",!0),setDisabled("cancelTimer",!0),main.pomodoro.reset()}function pauseTimer(){main.pomodoro.pause(),main.pomodoro.timer().isPaused()?(document.getElementById("pauseTimer_Pause").classList.value="hidden",document.getElementById("pauseTimer_Unpause").classList.value=""):(document.getElementById("pauseTimer_Pause").classList.value="",document.getElementById("pauseTimer_Unpause").classList.value="hidden")}function nextTimer(){setDisabled("startTimer",!1),setDisabled("pauseTimer",!0),setDisabled("cancelTimer",!0),main.pomodoro.next()}function setDisabled(e,t=!0){t?document.getElementById(e).setAttribute("disabled",t):document.getElementById(e).removeAttribute("disabled")}