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
        removeTask(identifier) {
            this.taskManager.removeTask(identifier);
            this.currentTask = {};
            this.updateTaskList();
        },
        saveTask() {
            if (this.isEdit) {
                this.taskManager.editTask(this.currentTask.identifier, this.currentTask);
            } else {
                this.taskManager.addTask(this.currentTask);
            }
            this.currentTask = {};
            this.isTaskFormModalOpen = false;
            this.updateTaskList();
        },
        storeTasks() {
            window.localStorage.setItem('tasks', JSON.stringify(this.taskManager.getTasks()) );
        },
        loadTasks() {
            this.taskManager.setTasks( JSON.parse(window.localStorage.getItem('tasks')) || [] );
        },
        updateTaskList() {
            setTimeout( () => {
                Array.from(document.getElementsByClassName('queue')).forEach(queue => {
                    let queueName = queue.getAttribute('queue');
                    let order = 0;
                    Array.from(queue.getElementsByClassName('task')).forEach(task => {
                        order++;
                        let identifier = task.getAttribute('id');
                        task = this.taskManager.getTask(identifier);
                        task.queue = queueName;
                        task.order = order;
                        this.taskManager.editTask(identifier, task);
                    });
                });
                this.storeTasks();
            }, 200);
        },
        queues: [
            "To Do",
            "Doing",
            "Done"
        ],
        init() {
            this.loadTasks();
            setTimeout( () => {
                Array.from(document.getElementsByClassName('queue')).forEach(queue => {
                    new Sortable(queue, {
                        group: "queues",
                        draggable: ".task",
                        animation: 100,
                        onAdd: function (evt) {
                            updateTaskList();
                        },
                        onUpdate: function (evt) {
                            updateTaskList();
                        },
                        onSort: function (evt) {
                            updateTaskList();
                        },
                    });
                });
            }, 250);
        }
    }
};

function updateTaskList() {
    document.querySelector('[x-data="taskManager()"]').__x.getUnobservedData().updateTaskList();
}