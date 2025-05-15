import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateFighterInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field(() => Int)
  age: number;

  @Field()
  weightClass: string;

  @Field(() => Int, { defaultValue: 0 })
  wins: number;

  @Field(() => Int, { defaultValue: 0 })
  losses: number;

  @Field(() => Int, { defaultValue: 0 })
  draws: number;

  @Field({ nullable: true })
  imageUrl?: string;
}
