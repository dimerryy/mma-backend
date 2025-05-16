import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fight } from './fight.entity';
import { CreateFightInput, UpdateFightInput } from './fight.dto';
import { Fighter } from '../fighter/fighter.entity';
import { Event } from '../event/event.entity';

@Injectable()
export class FightService {
  constructor(
    @InjectRepository(Fight)
    private readonly fightRepo: Repository<Fight>,
  ) {}

  async create(data: CreateFightInput): Promise<Fight> {
    const fight = this.fightRepo.create({
      event: { id: data.eventId } as Event,
      fighterA: { id: data.fighterAId } as Fighter,
      fighterB: { id: data.fighterBId } as Fighter,
      winner: data.winnerId ? { id: data.winnerId } as Fighter : undefined,
      method: data.method,
      rounds: data.rounds,
      duration: data.duration,
    });
    return this.fightRepo.save(fight);
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
}