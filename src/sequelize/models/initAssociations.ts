import { User } from "./user.model";
import { Project } from "./project.model";
import { Task } from "./task.model";

export default function initAssociations() {
  User.hasMany(Project, {
    sourceKey: "id",
    foreignKey: "creatorId",
    as: "projects",
  });

  Project.hasMany(Task, {
    sourceKey: "id",
    foreignKey: "projectId",
    as: "tasks",
  });
}