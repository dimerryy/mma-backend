import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Fighter } from '../fighter/fighter.entity';

@ObjectType()
@Entity('rankings')
export class Ranking {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Fighter)
  @ManyToOne(() => Fighter, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'fighter_id' })
  fighter: Fighter;

  @Field()
  @Column({ length: 50 })
  weightClass: string;

  @Field(() => Int)
  @Column({ default: 0 })
  points: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  rankPosition?: number;

 

}

