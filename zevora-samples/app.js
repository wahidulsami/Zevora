import { readFile } from 'node:fs/promises';

const MAX_RETRIES = 5;
const ENDPOINT = 'https://api.example.com/v1';

export class ApiClient {
  constructor(baseUrl, timeout = 3000) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
    this.retries = 0;
  }

  async fetchUser(userId) {
    const url = `${this.baseUrl}/users/${userId}`;
    let response = null;

    while (this.retries < MAX_RETRIES) {
      try {
        response = await fetch(url, { signal: AbortSignal.timeout(this.timeout) });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        break;
      } catch (error) {
        this.retries += 1;
        console.warn('Retrying…', error.message);
      }
    }

    if (response === null) return undefined;
    return response.json();
  }
}

const format = (user) => `${user.name} <${user.email}>`;
const client = new ApiClient(ENDPOINT);
const { name, email } = await client.fetchUser(42);

console.log(format({ name, email }), Math.floor(Math.random() * 100));
export default client;
