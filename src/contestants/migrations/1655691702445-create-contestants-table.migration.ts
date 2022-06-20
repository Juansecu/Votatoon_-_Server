import { MigrationInterface, QueryRunner } from 'typeorm';

import { ConsoleLoggerService } from '../../loggers/services/console-logger/console-logger.service';

export class CreateContestantsTableMigration1655691702445
  implements MigrationInterface
{
  private readonly _CONSOLE_LOGGER_SERVICE: ConsoleLoggerService =
    new ConsoleLoggerService();

  public async down(queryRunner: QueryRunner): Promise<void> {
    this._CONSOLE_LOGGER_SERVICE.warn('Dropping indices...');

    await queryRunner.query(
      `DROP INDEX \`IDX_42956c1174c45206004608964a\` ON \`Contestants\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_abfbbbe9f54a874d63884671d3\` ON \`Contestants\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f09060445b3a3e0fa4edefb951\` ON \`Contestants\``
    );

    this._CONSOLE_LOGGER_SERVICE.log('Indices dropped');

    this._CONSOLE_LOGGER_SERVICE.warn('Dropping contestants table...');

    await queryRunner.query(`DROP TABLE \`Contestants\``);

    this._CONSOLE_LOGGER_SERVICE.log('Contestants table dropped');
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    this._CONSOLE_LOGGER_SERVICE.verbose('Creating contestants table...');

    await queryRunner.query(
      `CREATE TABLE \`Contestants\` (\`Contestant_id\` int UNSIGNED NOT NULL, \`Name\` varchar(45) NOT NULL, \`Small_image_path\` varchar(125) NOT NULL, \`Large_image_path\` varchar(125) NOT NULL, \`Added_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_f09060445b3a3e0fa4edefb951\` (\`Name\`), UNIQUE INDEX \`IDX_abfbbbe9f54a874d63884671d3\` (\`Small_image_path\`), UNIQUE INDEX \`IDX_42956c1174c45206004608964a\` (\`Large_image_path\`), PRIMARY KEY (\`Contestant_id\`))`
    );

    this._CONSOLE_LOGGER_SERVICE.log('Contestants table created');
  }
}
