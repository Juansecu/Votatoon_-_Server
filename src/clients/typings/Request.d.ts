import { IRequestData } from '../../shared/typings/Request';

import { ClientEntity } from '../entities/client.entity';

export interface IRequestClientData extends IRequestData {
  data: TClientData;
}

export type TClientData = Record<'client', ClientEntity>;
