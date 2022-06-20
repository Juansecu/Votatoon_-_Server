import { MigrationInterface, QueryRunner } from 'typeorm';

import { ConsoleLoggerService } from '../../loggers/services/console-logger/console-logger.service';

export class CreateVotesTotalTableMigration1655695346523
  implements MigrationInterface
{
  private readonly _CONSOLE_LOGGER_SERVICE: ConsoleLoggerService =
    new ConsoleLoggerService();

  public async down(queryRunner: QueryRunner): Promise<void> {
    this._CONSOLE_LOGGER_SERVICE.warn('Dropping votes total table...');
    await queryRunner.query(`DROP TABLE \`Votes_total\``);
    this._CONSOLE_LOGGER_SERVICE.log('Votes total table dropped');
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    this._CONSOLE_LOGGER_SERVICE.verbose('Creating votes total table...');

    await queryRunner.query(
      `CREATE TABLE \`Votes_total\` (\`Vote_total_id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`Vote_total_value\` int UNSIGNED NOT NULL, \`Contestant_type\` enum ('a', 'b') NOT NULL, \`Contestant_id\` int UNSIGNED NOT NULL, \`Race_id\` int UNSIGNED NOT NULL, \`Created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`Vote_total_id\`)), FOREIGN KEY (\`Contestant_id\`) REFERENCES \`Contestants\` (\`Contestant_id\`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (\`Race_id\`) REFERENCES \`Races\` (\`Race_id\`) ON DELETE CASCADE ON UPDATE CASCADE`
    );

    this._CONSOLE_LOGGER_SERVICE.log('Votes total table created');
  }
}
