import { Project } from '../../projects/interfaces/project.interface';

export interface Client {
  clientName: string;
  email: string;
  isVerified: boolean;
  projects: Project[];
  _id: string;
}
