import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { CreateEventInput, UpdateEventInput } from './event.dto';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query(() => [Event])
  getAllEvents(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Mutation(() => Event)
  createEvent(@Args('data') data: CreateEventInput): Promise<Event> {
    return this.eventService.create(data);
  }

  @Mutation(() => Event)
  updateEvent(@Args('data') data: UpdateEventInput): Promise<Event> {
    return this.eventService.update(data);
  }

  @Mutation(() => Boolean)
  deleteEvent(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.eventService.remove(id);
  }

  @Query(() => [Event])
  getUpcomingEvents(): Promise<Event[]> {
    return this.eventService.findUpcoming();
  }
}
