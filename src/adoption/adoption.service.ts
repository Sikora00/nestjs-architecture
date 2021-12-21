import { Injectable } from '@nestjs/common';
import { VerificationService } from 'src/verification/verification.service';
import { Adoption } from './adoption.entity';
import { InMemoryAdoptionRepository } from './adoption.repository';
import { Pet, PetType } from './pet.entity';
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

    this.assertAge(pet, clientId);

    await this.adoptionRepository.insert(
      new Adoption(petId, clientId, new Date()),
    );
  }

  private reserve(petId: string, clientId: string) {
    throw new Error('Method not implemented.');
  }

  private assertAge(pet: Pet, clientId: string): void {
    const petId = pet.id;
    if (pet.type === PetType.Cat && pet.age < 1) {
      this.reserve(petId, clientId);
      throw new Error(`This pet is too young. Reserved`);
    }
    if (pet.type === PetType.Dog && pet.age < 0.5) {
      this.reserve(petId, clientId);
      throw new Error(`This pet is too young. Reserved`);
    }
  }
}
