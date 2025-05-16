import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Fighter } from '../fighter/fighter.entity';

@ObjectType()
export class RankingDto {
  @Field(() => Int)
  id: number;

  @Field(() => Fighter)
  fighter: Fighter;

  @Field()
  weightClass: string;

  @Field(() => Int)
  points: number;

  @Field(() => Int, { nullable: true })
  rankPosition?: number;
}
