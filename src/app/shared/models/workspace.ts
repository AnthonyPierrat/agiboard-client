import { User } from './user';
import { Project } from './project';

export class Workspace {

    id: number;

    name: string;

    description: string;

    owner: User;

    creationDate: Date

    lastUpdate: Date

    deleted: boolean;

    projects: Project[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
