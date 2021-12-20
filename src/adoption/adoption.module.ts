import { Module } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { AdoptionController } from './adoption.controller';
import { PetService } from './pet/pet.service';
import { InMemoryAdoptionRepository } from './adoption.repository';
import { VerificationModule } from 'src/verification/verification.module';

@Module({
  imports: [VerificationModule],
  controllers: [AdoptionController],
  providers: [AdoptionService, PetService, InMemoryAdoptionRepository],
})
export class AdoptionModule {}
