import { User } from './user';

export class Workspace {

    id: number;

    name: string;

    description: string;

    owner: User;

    creationDate: Date

    lastUpdate: Date

    deleted: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
