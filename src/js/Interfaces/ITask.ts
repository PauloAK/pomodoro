interface ITask {
    identifier : string;
    title : string;
    description ?: string;
    queue : string; 
    closed : boolean; 
}