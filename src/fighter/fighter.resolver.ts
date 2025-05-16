import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Fighter } from './fighter.entity';
import { FighterService } from './fighter.service';
import { CreateFighterInput } from './fighter.dto';
import { UpdateFighterInput } from './fighter.dto';
import { Int } from '@nestjs/graphql';

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

  @Mutation(() => Fighter)
  updateFighter(@Args('data') data: UpdateFighterInput): Promise<Fighter> {
    return this.fighterService.update(data);
  }

  @Mutation(() => Boolean)
  deleteFighter(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.fighterService.remove(id);
  }
}
