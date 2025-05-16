import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from './fighter.entity';
import { FighterService } from './fighter.service';
import { FighterResolver } from './fighter.resolver';
import { RankingCalculatorModule } from '../shared/utils/ranking-calculator.module';

@Module({
  imports: [TypeOrmModule.forFeature([Fighter]),RankingCalculatorModule],
  
  providers: [FighterService, FighterResolver],
})
export class FighterModule {}
