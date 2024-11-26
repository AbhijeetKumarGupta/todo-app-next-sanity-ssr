
type Status = 'open' | 'inprogress' | 'completed';

interface Task {
    _id?: string,
    _type: string,
    name: string;
    description: string;
    status: Status;
}

interface TastDetails { 
    params: { 
        taskId: string 
    } 
}