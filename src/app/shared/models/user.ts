import { Workspace } from './workspace';

export class User {

    id: number;

    name: string;

    email: string;

    password: string;

    creationDate: Date

    lastUpdate: Date

    admin: boolean;

    deleted: boolean;

    workspaces: Workspace[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
