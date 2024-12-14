import { Entity } from 'typeorm';

@Entity({ name: 'request_logs' })
export class RequestLog {
  id: number;

  requestUrl: string;
  request: string;
  response: string;

  createdAt: Date;
  updatedAt: Date;
  DeletedAt: Date;
}
