import { Resolver, Query } from '@nestjs/graphql';
import { Ranking } from './ranking.entity';
import { RankingService } from './ranking.service';

@Resolver(() => Ranking)
export class RankingResolver {
  constructor(private readonly rankingService: RankingService) {}

  @Query(() => [Ranking])
  getAllRankings(): Promise<Ranking[]> {
    return this.rankingService.findAll();
  }
}