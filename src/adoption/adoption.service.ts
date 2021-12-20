import { Injectable } from '@nestjs/common';
import { VerificationService } from 'src/verification/verification.service';
import { Adoption } from './adoption.entity';
import { InMemoryAdoptionRepository } from './adoption.repository';
import { PetService } from './pet/pet.service';

@Injectable()
export class AdoptionService {
  constructor(
    private adoptionRepository: InMemoryAdoptionRepository,
    private verificationService: VerificationService,
    private petRepository: PetService,
  ) {}
  async adopt(petId: string, clientId: string): Promise<void> {
    const pet = await this.petRepository.findById(petId);
    if (!pet) {
      throw new Error('The pet is not followed by the system');
    }
    const adoption = await this.adoptionRepository.findByPet(petId);

    if (adoption) {
      throw new Error('The pet is already adopted');
    }

    if (!(await this.verificationService.canAdopt())) {
      throw new Error(`This customer can't adopt`);
    }

    if (pet.age < 1) {
      this.reserve(petId, clientId);
      throw new Error(`This pet is too young. Reserved`);
    }
    await this.adoptionRepository.insert(
      new Adoption(petId, clientId, new Date()),
    );
  }

  private reserve(petId: string, clientId: string) {
    throw new Error('Method not implemented.');
  }
}
