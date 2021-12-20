import { Module } from '@nestjs/common';
import { VerificationModule } from 'src/verification/verification.module';
import { AdoptionRepository } from '../adoption-business-logic/ports/adoption.repository';
import { CanClientAdoptPet } from '../adoption-business-logic/ports/can-client-adopt-pet';
import { PetRepository } from '../adoption-business-logic/ports/pet.repository';
import { CanClientAdoptPetAdapter } from './can-client-adopt-pet.adapter';
import { InMemoryAdoptionRepository } from './in-memory-adoption.repository';
import { PetService } from './pet.service';

@Module({
  imports: [VerificationModule],
  providers: [
    { provide: AdoptionRepository, useClass: InMemoryAdoptionRepository },
    { provide: CanClientAdoptPet, useClass: CanClientAdoptPetAdapter },
    { provide: PetRepository, useClass: PetService },
  ],
  exports: [AdoptionRepository, CanClientAdoptPet, PetRepository],
})
export class AdoptionSecondaryAdaptersModule {}
