import type { RequestOptions } from './types';

export interface User {
  readonly id: number;
  name: string;
  email?: string;
  tags: string[];
}

export type Result<T> = { ok: true; value: T } | { ok: false; error: Error };

export enum Status {
  Idle,
  Loading,
  Success,
  Error,
}

@injectable()
export class UserService<T extends object> implements AutoRefresh {
  private readonly users = new Map<number, User>();
  protected status: Status = Status.Idle;

  constructor(private readonly http: HttpClient, options?: RequestOptions) {
    super(options);
  }

  async getUser(id: number): Promise<User | null> {
    const cached = this.users.get(id);
    if (cached !== undefined) return cached;

    const response = await this.http.get<User>(`/users/${id}`);
    this.users.set(id, response);
    return response;
  }

  static isEmail(value: string): value is string {
    return /.+@.+\..+/.test(value);
  }
}
