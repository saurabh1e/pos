import {IOrganisation} from './organisation';

export interface IStore {
  id: string;
  name: string;
  organisation: IOrganisation;
}
