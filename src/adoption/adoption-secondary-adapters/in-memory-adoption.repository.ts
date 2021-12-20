import { Injectable } from '@nestjs/common';
import { Adoption } from '../adoption-business-logic/entities/adoption.entity';
import { AdoptionRepository } from '../adoption-business-logic/ports/adoption.repository';

@Injectable()
export class InMemoryAdoptionRepository implements AdoptionRepository {
  private adoptions: Adoption[] = [];

  insert(adoption: Adoption): void {
    this.adoptions.push(adoption);
  }
  findByPet(petId: string): Adoption | undefined {
    return this.adoptions.find((adoption) => adoption.petId === petId);
  }
}
