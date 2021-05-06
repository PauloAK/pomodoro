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
    if (main.pomodoro.timer().isPaused()){
        document.getElementById('pauseTimer_Pause').classList.value = 'hidden';
        document.getElementById('pauseTimer_Unpause').classList.value = '';
    } else {
        document.getElementById('pauseTimer_Pause').classList.value = '';
        document.getElementById('pauseTimer_Unpause').classList.value = 'hidden';
    }

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

function taskManager() {
    return {
        isTaskFormModalOpen: false,
        taskManager: new Tasks(),
        currentTask: {},
        isEdit: false,
        editTask(identifier = null, queue = null) {
            console.log(identifier);
            if (!identifier) {
                this.isEdit = false;
                this.currentTask = this.taskManager.generateNewTask();
                this.currentTask.queue = queue;
            } else {
                this.isEdit = true;
                this.currentTask = this.taskManager.getTask(identifier);
            }

            this.isTaskFormModalOpen = true;
        },
        saveTask() {
            console.log(this.currentTask);
            if (this.isEdit) {
                this.taskManager.editTask(this.currentTask.identifie, this.currentTask);
            } else {
                this.taskManager.addTask(this.currentTask);
            }
            this.isTaskFormModalOpen = false;
        },
        queues: [
            "To Do",
            "Doing",
            "Done"
        ]
    }
};