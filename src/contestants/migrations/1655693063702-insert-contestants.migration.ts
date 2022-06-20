import { MigrationInterface, QueryRunner } from 'typeorm';

import { contestants } from '../data/contestants';

import { ContestantEntity } from '../entities/contestant.entity';

import { ConsoleLoggerService } from '../../loggers/services/console-logger/console-logger.service';

export class InsertContestantsMigration1655693063702
  implements MigrationInterface
{
  private readonly _CONSOLE_LOGGER_SERVICE: ConsoleLoggerService =
    new ConsoleLoggerService();

  public async down(queryRunner: QueryRunner): Promise<void> {
    this._CONSOLE_LOGGER_SERVICE.warn('Deleting default contestants...');

    for (const contestant of contestants) {
      await queryRunner.query(
        `DELETE FROM \`Contestants\` WHERE \`Contestant_id\` = ${contestant.contestantId}`
      );
    }

    this._CONSOLE_LOGGER_SERVICE.log('Default contestants deleted');
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    this._CONSOLE_LOGGER_SERVICE.verbose('Inserting default contestants...');

    for (const contestant of contestants) {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(ContestantEntity)
        .values(contestant)
        .execute();
    }

    this._CONSOLE_LOGGER_SERVICE.log('Default contestants inserted');
  }
}
