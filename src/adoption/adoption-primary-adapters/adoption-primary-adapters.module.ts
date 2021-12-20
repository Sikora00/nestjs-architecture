import { Module } from '@nestjs/common';
import { AdoptionBusinessLogicModule } from '../adoption-business-logic/adoption-business-logic.module';
import { AdoptionSecondaryAdaptersModule } from '../adoption-secondary-adapters/adoption-secondary-adapters.module';
import { AdoptionController } from './rest-api/adoption.controller';

@Module({
  imports: [
    AdoptionBusinessLogicModule.withAdapters([AdoptionSecondaryAdaptersModule]),
  ],
  controllers: [AdoptionController],
})
export class AdoptionPrimaryAdaptersModule {}
