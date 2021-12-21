import { Injectable } from '@nestjs/common';
import { Adoption } from './entities/adoption.entity';
import { Pet, PetType } from './entities/pet.entity';
import { AdoptionRepository } from './ports/adoption.repository';
import { CanClientAdoptPet } from './ports/can-client-adopt-pet';
import { PetRepository } from './ports/pet.repository';

@Injectable()
export class AdoptionService {
  constructor(
    private adoptionRepository: AdoptionRepository,
    private canClientAdoptPet: CanClientAdoptPet,
    private petRepository: PetRepository,
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

    if (!(await this.canClientAdoptPet.canAdopt(clientId))) {
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
