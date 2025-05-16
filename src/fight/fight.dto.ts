import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateFightInput {
  @Field(() => Int)
  eventId: number;

  @Field(() => Int)
  fighterAId: number;

  @Field(() => Int)
  fighterBId: number;

  @Field(() => Int, { nullable: true })
  winnerId?: number;

  @Field({ nullable: true })
  method?: string;

  @Field(() => Int, { nullable: true })
  rounds?: number;

  @Field({ nullable: true })
  duration?: string;
}

@InputType()
export class UpdateFightInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  eventId?: number;

  @Field(() => Int, { nullable: true })
  fighterAId?: number;

  @Field(() => Int, { nullable: true })
  fighterBId?: number;

  @Field(() => Int, { nullable: true })
  winnerId?: number;

  @Field({ nullable: true })
  method?: string;

  @Field(() => Int, { nullable: true })
  rounds?: number;

  @Field({ nullable: true })
  duration?: string;
}