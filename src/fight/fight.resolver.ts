import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Fight } from './fight.entity';
import { FightService } from './fight.service';
import { CreateFightInput, UpdateFightInput } from './fight.dto';

@Resolver(() => Fight)
export class FightResolver {
  constructor(private readonly fightService: FightService) {}

  @Query(() => [Fight])
  getAllFights(): Promise<Fight[]> {
    return this.fightService.findAll();
  }

  @Mutation(() => Fight)
  createFight(@Args('data') data: CreateFightInput): Promise<Fight> {
    return this.fightService.create(data);
  }

  @Mutation(() => Fight)
  updateFight(@Args('data') data: UpdateFightInput): Promise<Fight> {
    return this.fightService.update(data);
  }

  @Mutation(() => Boolean)
  deleteFight(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.fightService.remove(id);
  }
}