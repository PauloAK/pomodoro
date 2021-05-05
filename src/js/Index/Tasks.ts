class Tasks {
    tasks : Array<ITask> = new Array;

    addTask(task : ITask) : void
    {
        this.tasks.push(task);
    }

    getTask(identifier : string) : ITask
    {
        return this.tasks.filter( (task : ITask) => {
            return task.identifier == identifier;
        }).shift();
    }

    editTask(identifier : string, editedTask : ITask)
    {
        this.tasks = this.tasks.map( (task : ITask) => {
            if (task.identifier == identifier)
                return editedTask;
            else
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

    generateNewTask() : ITask
    {
        let task = <ITask>{};
        task.identifier = this.makeID();
        return task;
    }

    makeID() {
        var result = [];
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 20; i++ ) {
            result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
        }
        return result.join('');
    }
}