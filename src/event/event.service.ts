// src/event/event.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventInput, UpdateEventInput } from './event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
  ) {}

  async create(data: CreateEventInput): Promise<Event> {
    const event = this.eventRepo.create(data);
    return this.eventRepo.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepo.find();
  }

  async update(data: UpdateEventInput): Promise<Event> {
    const event = await this.eventRepo.preload(data);
    if (!event) throw new Error(`Event with ID ${data.id} not found`);
    return this.eventRepo.save(event);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.eventRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
