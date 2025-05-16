import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fight } from './fight.entity';
import { FightService } from './fight.service';
import { FightResolver } from './fight.resolver';
import { Ranking } from '../ranking/ranking.entity';
import { Fighter } from '../fighter/fighter.entity';
import { RankingCalculatorService } from '../shared/utils/ranking-calculator.service';


@Module({
  imports: [TypeOrmModule.forFeature([Fight, Ranking, Fighter])],
  providers: [FightService, FightResolver, RankingCalculatorService],
})
export class FightModule {}