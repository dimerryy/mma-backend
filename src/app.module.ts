import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

import { Fighter } from './fighter/fighter.entity';
import { Event } from './event/event.entity';
import { Fight } from './fight/fight.entity';
import { Ranking } from './ranking/ranking.entity';

import { FighterModule } from './fighter/fighter.module';
import { EventModule } from './event/event.module';
import { FightModule } from './fight/fight.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [
    // Load .env variables
    ConfigModule.forRoot(),

    // TypeORM + PostgreSQL setup
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'mma_db',
      entities: [Fighter, Event, Fight, Ranking],
      synchronize: true, // for development only
    }),

    // GraphQL setup with code-first approach
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      introspection: true,
    }),

    // Feature modules
    FighterModule,
    EventModule,
    FightModule,
    RankingModule,
  ],
})
export class AppModule {}
