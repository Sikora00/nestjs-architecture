import { Injectable } from '@nestjs/common';
import { VerificationService } from 'src/verification/verification.service';
import {
  Adoption,
  AdoptionFactory,
  AdoptResult,
} from '../adoption-business-logic/domain/adoption.aggregate';
import { Age } from '../adoption-business-logic/domain/age';
import { AdoptionRepository } from '../adoption-business-logic/ports/adoption.repository';

@Injectable()
export class InMemoryAdoptionRepository implements AdoptionRepository {
  constructor(private verificationService: VerificationService) {}
  private adoptions: AdoptResult[] = [];

  insert(adoption: AdoptResult): void {
    this.adoptions.push(adoption);
  }

  get(petId: string, clientId: string): Adoption {
    const pet = { type: 0, id: petId, age: new Age(2, 0) }; // fetched from any data storage
    // if pet is missing throw new Error('The pet is not followed by the system');
    return AdoptionFactory(
      pet,
      this.verificationService.canAdopt(clientId),
      !!this.adoptions.find((adoption) => adoption.petId === petId),
    );
  }
}
