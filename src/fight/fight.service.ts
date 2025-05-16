import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fight } from './fight.entity';
import { CreateFightInput, UpdateFightInput } from './fight.dto';
import { Fighter } from '../fighter/fighter.entity';
import { Event } from '../event/event.entity';
import { RankingCalculatorService } from '../shared/utils/ranking-calculator.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';


@Injectable()
export class FightService {
  constructor(
    @InjectRepository(Fight)
    private readonly fightRepo: Repository<Fight>,
    private readonly rankingCalculator: RankingCalculatorService,
    @InjectRepository(Fighter) 
    private readonly fighterRepo: Repository<Fighter>,
  ) {}

  async create(data: CreateFightInput): Promise<Fight> {

  if (data.fighterAId === data.fighterBId) {
    throw new BadRequestException('Fighter A and Fighter B must be different');
  }

  const fighterA = await this.fighterRepo.findOne({ where: { id: data.fighterAId } });
  if (!fighterA) throw new NotFoundException(`Fighter A with ID ${data.fighterAId} not found`);

  const fighterB = await this.fighterRepo.findOne({ where: { id: data.fighterBId } });
  if (!fighterB) throw new NotFoundException(`Fighter B with ID ${data.fighterBId} not found`);

    const fight = this.fightRepo.create({
      event: { id: data.eventId } as Event,
      fighterA: { id: data.fighterAId } as Fighter,
      fighterB: { id: data.fighterBId } as Fighter,
      winner: data.winnerId ? { id: data.winnerId } as Fighter : undefined,
      method: data.method,
      rounds: data.rounds,
      duration: data.duration,
    });
  
    const savedFight = await this.fightRepo.save(fight);
  
    const winner = data.winnerId
      ? await this.fighterRepo.findOne({ where: { id: data.winnerId } })
      : undefined;
  
    const loserId =
      data.winnerId === data.fighterAId ? data.fighterBId : data.fighterAId;
    const loser = await this.fighterRepo.findOne({ where: { id: loserId } });
  
    if (winner) {
      winner.wins += 1;
      winner.winStreak += 1;
  
      if (data.method?.toLowerCase() === 'ko' || data.method?.toLowerCase() === 'submission') {
        winner.finishes += 1;
      }
  
      await this.fighterRepo.save(winner);
    }
  
    if (loser) {
      loser.losses += 1;
      loser.winStreak = 0;
      await this.fighterRepo.save(loser);
    }
  
    if (winner?.weightClass) {
      await this.rankingCalculator.recalculateRankings(winner.weightClass);
    }
  
    const fullFight = await this.fightRepo.findOne({
        where: { id: savedFight.id },
        relations: ['event', 'fighterA', 'fighterB', 'winner'],
      });
      
      if (!fullFight) {
        throw new Error('Fight not found after save');
      }
      
      return fullFight;
  }
  

  async findAll(): Promise<Fight[]> {
    return this.fightRepo.find({
      relations: ['event', 'fighterA', 'fighterB', 'winner'],
    });
  }

  async update(data: UpdateFightInput): Promise<Fight> {
    const fight = await this.fightRepo.preload({
      id: data.id,
      event: data.eventId ? { id: data.eventId } as Event : undefined,
      fighterA: data.fighterAId ? { id: data.fighterAId } as Fighter : undefined,
      fighterB: data.fighterBId ? { id: data.fighterBId } as Fighter : undefined,
      winner: data.winnerId ? { id: data.winnerId } as Fighter : undefined,
      method: data.method,
      rounds: data.rounds,
      duration: data.duration,
    });
    if (!fight) throw new Error(`Fight with ID ${data.id} not found`);
    return this.fightRepo.save(fight);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.fightRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async findByFighterId(fighterId: number): Promise<Fight[]> {
    return this.fightRepo.find({
      where: [
        { fighterA: { id: fighterId } },
        { fighterB: { id: fighterId } },
      ],
      relations: ['event', 'fighterA', 'fighterB', 'winner'],
    });
  }
}