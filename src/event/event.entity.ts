import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { OneToMany } from 'typeorm';
import { Fight } from '../fight/fight.entity';

@ObjectType()
@Entity('events')
export class Event {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({nullable: true })
  @Column({ length: 150 })
  name: string;

  @Field()
  @Column()
  date: Date;

  @Field({ nullable: true })
  @Column({ length: 255, nullable: true })
  location?: string;

  @Field(() => [Fight])
  @OneToMany(() => Fight, fight => fight.event)
  fights: Fight[];
}
