import Dexie from "dexie";

export class db extends Dexie {
  constructor() {
    // run Dexie('db')
    super("db");

    // create table
    this.version(1).stores({
      projects: "++id, name",
      cards: "++id, title, project, person, status",
    });

    // shorten syntax
    this.projects = this.table("projects");
    this.cards = this.table("cards");
  }

  async getProjects() {
    let names = await this.projects.orderBy("id").toArray();
    return names;
  }

  async getCards(currentProject) {
    let status0 = this.cards.where({ project: currentProject, status: 0 });
    status0 = await status0.toArray();
    let status1 = this.cards.where({ project: currentProject, status: 1 });
    status1 = await status1.toArray();
    let status2 = this.cards.where({ project: currentProject, status: 2 });
    status2 = await status2.toArray();
    let status3 = this.cards.where({ project: currentProject, status: 3 });
    status3 = await status3.toArray();
    return [{ status0 }, { status1 }, { status2 }, { status3 }];
  }

  async checkProjectName(projectname) {
    let num = this.projects.where({ name: projectname });
    return await num.count();
  }

  async addProject(projectname) {
    let x = await this.checkProjectName(projectname);
    if (x != 0) {
      alert("Project name existed");
    } else {
      return this.projects.add({ name: projectname });
    }
  }

  addCard(e, x) {
    if (x == null) {
      alert("Please select project");
      return;
    } else {
      return this.cards.add({
        project: x,
        title: e[0],
        person: e[1],
        description: e[2],
        status: 0,
        project_status: x + "0",
      });
    }
  }
  async important(e) {
    let i = await this.cards.get(e);
    if (i.important == 1) {
      this.cards.update(e, { important: 0 });
    } else {
      this.cards.update(e, { important: 1 });
    }
  }

  async next(e) {
    let s = await this.cards.get(e);
    return this.cards.update(e, { status: s.status + 1 });
  }

  deleteCard(cardId) {
    return this.cards.delete(cardId);
  }

  async deleteAllCards(name) {
    let cards = this.cards.where({ project: name });
    return await cards.delete();
  }

  async deleteProject(name) {
    this.deleteAllCards(name);
    let project = this.projects.where({ name: name });
    return await project.delete();
  }
}
