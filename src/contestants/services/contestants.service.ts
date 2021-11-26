import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ContestantEntity } from '../entities/contestant.entity';

@Injectable()
export class ContestantsService {
  constructor(
    @InjectRepository(ContestantEntity)
    private readonly _CONTESTANTS_REPOSITORY: Repository<ContestantEntity>
  ) {}

  async getContestantsById(
    contestantIds: number[]
  ): Promise<ContestantEntity[]> {
    try {
      return await this._CONTESTANTS_REPOSITORY.findByIds(contestantIds);
    } catch (error) {
      throw new Error(error);
    }
  }
}
