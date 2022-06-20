import { MigrationInterface, QueryRunner } from 'typeorm';

import { ConsoleLoggerService } from '../../loggers/services/console-logger/console-logger.service';

export class CreateRacesTableMigration1655694101615
  implements MigrationInterface
{
  private readonly _CONSOLE_LOGGER_SERVICE: ConsoleLoggerService =
    new ConsoleLoggerService();

  public async down(queryRunner: QueryRunner): Promise<void> {
    this._CONSOLE_LOGGER_SERVICE.warn('Dropping races table...');
    await queryRunner.query(`DROP TABLE \`Races\``);
    this._CONSOLE_LOGGER_SERVICE.log('Races table dropped');
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    this._CONSOLE_LOGGER_SERVICE.verbose('Creating races table...');

    await queryRunner.query(
      `CREATE TABLE \`Races\` (\`Race_id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`Active\` tinyint UNSIGNED NOT NULL, \`Created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`Race_id\`))`
    );

    this._CONSOLE_LOGGER_SERVICE.log('Races table created');
  }
}
