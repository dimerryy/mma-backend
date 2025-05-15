import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Fighter } from './fighter.entity';
import { FighterService } from './fighter.service';
import { CreateFighterInput } from './fighter.dto';

@Resolver(() => Fighter)
export class FighterResolver {
  constructor(private readonly fighterService: FighterService) {}

  @Query(() => [Fighter])
  getAllFighters(): Promise<Fighter[]> {
    return this.fighterService.findAll();
  }

  @Mutation(() => Fighter)
  createFighter(
    @Args('data') data: CreateFighterInput,
  ): Promise<Fighter> {
    return this.fighterService.create(data);
  }
}
