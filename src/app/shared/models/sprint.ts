import { Project } from './project';
import { Event } from './event';
import { Task } from './task';

export class Sprint {

    id: number;

    name: string;

    events: Event[];

    tasks: Task[];

    project : Project;

    startDate: Date

    endDate: Date

    creationDate: Date

    lastUpdate: Date

    deleted: boolean = false;

}
