import { Adoption } from './adoption.entity';

export class InMemoryAdoptionRepository {
  private adoptions: Adoption[] = [];

  insert(adoption: Adoption): void {
    this.adoptions.push(adoption);
  }
  findByPet(petId: string): Adoption | undefined {
    return this.adoptions.find((adoption) => adoption.petId === petId);
  }
}
