class User {}
class Criterion {}

class OfflineItem {
  id: string = crypto.randomUUID();
  title: string;
  seqId: number = Math.random();
  statusId: "BACKLOG" | "IN_PROGRESS" | "DONE";
  description: string = "";
  sortOrder: number;
  createdAt: string = new Date().toISOString();
  updatedAt: string = new Date().toISOString();
  flagged: boolean = false;
  criteria: Criterion[] = [];
  assignees: User[] = [];

  constructor(input: { title: string; statusId: OfflineItem["statusId"] }) {
    this.title = input.title;
    this.statusId = input.statusId;
    this.sortOrder = this.seqId;
  }
}

export { OfflineItem };
