import {IStore} from './store';

export interface IOrganisation {
  id: string;
  name: string;
  stores: IStore[];
}
