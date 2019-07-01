import { EventType } from "../enums/event-type.enum";
import { User } from './user';
import { Sprint } from './sprint';

export class Event {
    id: number;

    description : string;

    type: EventType;

    members: User[];

    sprint: Sprint;

    startDate: Date;

    endDate: Date;

    creationDate: Date;

    lastUpdate: Date;

    deleted: boolean = false;
}
