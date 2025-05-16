import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ranking } from './ranking.entity';
import { RankingService } from './ranking.service';
import { RankingResolver } from './ranking.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Ranking])],
  providers: [RankingService, RankingResolver],
})
export class RankingModule {}
