const { TypeOrmModuleOptions } = require('@nestjs/typeorm');

/**
 * TypeOrm Module Options.
 *
 * @type TypeOrmModuleOptions
 */
module.exports = {
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/dist/**/entities/*.entity.js'],
  host: process.env.DATABASE_HOST,
  migrations: [__dirname + '/dist/**/migrations/*.migration.js'],
  migrationsRun: true,
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DATABASE_PORT),
  type: 'mysql',
  username: process.env.DATABASE_USERNAME
};
