import { InputType, Field, Int, PartialType } from '@nestjs/graphql';


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
  finishes: number;


  @Field(() => Int, { defaultValue: 0 })
  losses: number;

  @Field(() => Int, { defaultValue: 0 })
  draws: number;

  @Field(() => Int, { defaultValue: 0 })
  winStreak: number;

  @Field({ nullable: true })
  imageUrl?: string;
}

@InputType()
export class UpdateFighterInput extends PartialType(CreateFighterInput) {
  @Field(() => Int)
  id: number;
}