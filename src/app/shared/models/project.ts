import { Workspace } from "./workspace";
import { Sprint } from "./sprint";
import { UserProject } from "./userProject";

export class Project {

    id: number;

    name: string;

    description: string;

    workspace: Workspace;

    sprints: Sprint[];

    userProjects: UserProject[];

    budget: number;

    creationDate: Date;

    startDate: Date;

    endDate: Date;

    lastUpdate: Date;

    deleted: boolean;
}
