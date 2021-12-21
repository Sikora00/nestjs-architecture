import { Module } from '@nestjs/common';
import { VerificationModule } from 'src/verification/verification.module';
import { AdoptionRepository } from '../adoption-business-logic/ports/adoption.repository';
import { InMemoryAdoptionRepository } from './in-memory-adoption.repository';

@Module({
  imports: [VerificationModule],
  providers: [
    { provide: AdoptionRepository, useClass: InMemoryAdoptionRepository },
  ],
  exports: [AdoptionRepository],
})
export class AdoptionSecondaryAdaptersModule {}
