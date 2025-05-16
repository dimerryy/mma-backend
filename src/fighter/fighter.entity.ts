import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('fighters')
export class Fighter {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  firstName: string;

  @Field()
  @Column({ length: 100 })
  lastName: string;

  @Field({ nullable: true })
  @Column({ length: 100, nullable: true })
  nickname?: string;

  @Field(() => Int)
  @Column()
  age: number;

  @Field()
  @Column({ length: 50 })
  weightClass: string;

  @Field(() => Int)
  @Column({ default: 0 })
  wins: number;

  @Field(() => Int)
  @Column({ default: 0 })
  finishes: number; 

  @Field(() => Int)
  @Column({ default: 0 })
  losses: number;

  @Field(() => Int)
  @Column({ default: 0 })
  draws: number;

  @Field(() => Int)
  @Column({ default: 0 })
  winStreak: number;

  @Field({ nullable: true })
  @Column({ length: 255, nullable: true })
  imageUrl?: string;
}
