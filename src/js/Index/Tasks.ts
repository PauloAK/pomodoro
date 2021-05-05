class Tasks {
    tasks : Array<ITask> = new Array;

    addTask(task : ITask) : void
    {
        this.tasks.push(task);
    }

    getTask(identifier : string) : ITask
    {
        return this.tasks.filter( (task : ITask) => {
            task.identifier == identifier;
        }).shift();
    }

    editTask(identifier : string, editedTask : ITask)
    {
        this.tasks = this.tasks.map( (task : ITask) => {
            if (task.identifier == identifier){
                task = editedTask;
            }
            return task;
        });
    }

    removeTask(task : ITask) : void
    {
        this.tasks = this.tasks.filter( (_task : ITask) => {
            return task != _task;
        });
    }

    getTasks() : Array<ITask>
    {
        return this.tasks;
    }
}