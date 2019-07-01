import { Status } from "../enums/status.enum";
import { User } from './user';
import { Sprint } from './sprint';

export class Task {
    id: number;

    description: string;
    
    status: Status;

    members: User[];

    sprint: Sprint;

    creationDate: Date

    lastUpdate: Date

    deleted: boolean = false;
}
