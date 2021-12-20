import { Pet } from '../entities/pet.entity';

export abstract class PetRepository {
  abstract findById(petId: string): Pet | undefined;
}
