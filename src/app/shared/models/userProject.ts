import { User } from "./user";
import { Project } from "./project";
import { MemberType } from "../enums/member-type.enum";

export class UserProject {

    type: MemberType;

    user: User;

    project: Project;

}