let main=new Main;function startTimer(){setDisabled("startTimer",!0),setDisabled("pauseTimer",!1),setDisabled("cancelTimer",!1),main.pomodoro.start()}function cancelTimer(){setDisabled("startTimer",!1),setDisabled("pauseTimer",!0),setDisabled("cancelTimer",!0),main.pomodoro.reset()}function pauseTimer(){main.pomodoro.pause(),main.pomodoro.timer().isPaused()?(document.getElementById("pauseTimer_Pause").classList.value="hidden",document.getElementById("pauseTimer_Unpause").classList.value=""):(document.getElementById("pauseTimer_Pause").classList.value="",document.getElementById("pauseTimer_Unpause").classList.value="hidden")}function nextTimer(){setDisabled("startTimer",!1),setDisabled("pauseTimer",!0),setDisabled("cancelTimer",!0),main.pomodoro.next()}function setDisabled(e,s=!0){s?document.getElementById(e).setAttribute("disabled",s):document.getElementById(e).removeAttribute("disabled")}function taskManager(){return{isTaskFormModalOpen:!1,taskManager:new Tasks,currentTask:{},isEdit:!1,editTask(e=null,s=null){e?(this.isEdit=!0,this.currentTask=this.taskManager.getTask(e)):(this.isEdit=!1,this.currentTask=this.taskManager.generateNewTask(),this.currentTask.queue=s),this.isTaskFormModalOpen=!0},saveTask(){this.isEdit?this.taskManager.editTask(this.currentTask.identifie,this.currentTask):this.taskManager.addTask(this.currentTask),this.currentTask={},this.isTaskFormModalOpen=!1},queues:["To Do","Doing","Done"],initQueues(){setTimeout(()=>{Array.from(document.getElementsByClassName("queue")).forEach(e=>{new Sortable(e,{group:"queues",draggable:".task",animation:100})})},250)}}}