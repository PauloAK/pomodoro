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

    removeTask(identifier : string) : void
    {
        this.tasks = this.tasks.filter( (task : ITask) => {
            return task.identifier != identifier;
        });
    }

    getTasks() : Array<ITask>
    {
        return this.tasks.sort((a, b) => (a.order || 0) - (b.order || 0));
    }

    setTasks(tasks : Array<ITask>) : void
    {
        this.tasks = tasks;
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