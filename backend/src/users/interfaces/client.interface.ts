import { Project } from '../../projects/interfaces/project.interface';
import { Proposal } from './proposal.interface';

export interface Client {
  clientName: string;
  email: string;
  isVerified: boolean;
  projects: Project[];
  proposal: Proposal;
  _id: string;
}
