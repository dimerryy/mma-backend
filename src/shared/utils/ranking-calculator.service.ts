import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fighter } from '../../fighter/fighter.entity';
import { Ranking } from '../../ranking/ranking.entity';

@Injectable()
export class RankingCalculatorService {
  constructor(
    @InjectRepository(Fighter)
    private readonly fighterRepo: Repository<Fighter>,

    @InjectRepository(Ranking)
    private readonly rankingRepo: Repository<Ranking>,
  ) {}

  async recalculateRankings(weightClass: string): Promise<void> {
    const fighters = await this.fighterRepo.find({ where: { weightClass } });
    const rankings: { fighter: Fighter; points: number }[] = fighters.map(fighter => ({
      fighter,
      points: fighter.wins * 3 + fighter.finishes * 1 + fighter.draws * 1 + fighter.winStreak * 0.5,
    }));

    rankings.sort((a, b) => b.points - a.points);

    for (let i = 0; i < rankings.length; i++) {
      const { fighter, points } = rankings[i];

      const existing = await this.rankingRepo.findOne({
        where: { fighter: { id: fighter.id }, weightClass },
      });

      if (existing) {
        existing.points = Math.round(points);
        existing.rankPosition = i + 1;
        await this.rankingRepo.save(existing);
      } else {
        const newRanking = this.rankingRepo.create({
          fighter,
          weightClass,
          points: Math.round(points),
          rankPosition: i + 1,
        });
        await this.rankingRepo.save(newRanking);
      }
    }
  }
}
