import { Workspace } from "./workspace";
import { UserProject } from "./userProject";

export class Project {

    id: number;

    name: string;

    description: string;

    workspace: Workspace;

    userProjects: UserProject[];

    budget: number;

    creationDate: Date;

    startDate: Date;

    endDate: Date;

    lastUpdate: Date;

    deleted: boolean;
}
