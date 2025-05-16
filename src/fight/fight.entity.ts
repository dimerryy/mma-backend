import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Fighter } from '../fighter/fighter.entity';
import { Event } from '../event/event.entity';

@ObjectType()
@Entity('fights')
export class Fight {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Event)
  @ManyToOne(() => Event)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Field(() => Fighter)
  @ManyToOne(() => Fighter)
  @JoinColumn({ name: 'fighter_a_id' })
  fighterA: Fighter;

  @Field(() => Fighter)
  @ManyToOne(() => Fighter)
  @JoinColumn({ name: 'fighter_b_id' })
  fighterB: Fighter;

  @Field(() => Fighter, { nullable: true })
  @ManyToOne(() => Fighter, { nullable: true })
  @JoinColumn({ name: 'winner_id' })
  winner?: Fighter;

  @Field({ nullable: true })
  @Column({ nullable: true })
  method?: string; // KO, Submission, Decision, etc.

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  rounds?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  duration?: string; // e.g. "3:15"
}

