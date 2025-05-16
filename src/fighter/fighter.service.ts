import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fighter } from './fighter.entity';
import { CreateFighterInput } from './fighter.dto';
import { UpdateFighterInput } from './fighter.dto';

@Injectable()
export class FighterService {
  constructor(
    @InjectRepository(Fighter)
    private readonly fighterRepo: Repository<Fighter>,
  ) {}

  async create(data: CreateFighterInput): Promise<Fighter> {
    const fighter = this.fighterRepo.create(data);
    return this.fighterRepo.save(fighter);
  }

  async findAll(): Promise<Fighter[]> {
    return this.fighterRepo.find();
  }

  async update(data: UpdateFighterInput): Promise<Fighter> {
    const fighter = await this.fighterRepo.preload(data);
    if (!fighter) {
      throw new Error(`Fighter with ID ${data.id} not found`);
    }
    return this.fighterRepo.save(fighter);
  }
  
  async remove(id: number): Promise<boolean> {
    const result = await this.fighterRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
