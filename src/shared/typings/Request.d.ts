import { Request } from 'express';

export interface IRequestData extends Request {
  data: Record<string, unknown>;
}
