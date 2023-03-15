import { Connection, createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
  database: string;
}
export default async (): Promise<Connection> => {
  return getConnectionOptions().then((options) => {
    return createConnection(
      Object.assign(options, {
        // host,
        database:
          process.env.NODE_ENV === 'test' ? 'rentalX_Test' : options.database,
      }),
    );
  });
};
