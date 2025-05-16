import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from '../../fighter/fighter.entity';
import { Ranking } from '../../ranking/ranking.entity';
import { RankingCalculatorService } from './ranking-calculator.service';

@Module({
  imports: [TypeOrmModule.forFeature([Fighter, Ranking])],
  providers: [RankingCalculatorService],
  exports: [RankingCalculatorService], 
})
export class RankingCalculatorModule {}
