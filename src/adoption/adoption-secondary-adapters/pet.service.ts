import { Injectable } from '@nestjs/common';
import { Pet } from '../adoption-business-logic/entities/pet.entity';
import { PetRepository } from '../adoption-business-logic/ports/pet.repository';

@Injectable()
export class PetService implements PetRepository {
  findById(petId: string): Pet {
    return new Pet(1);
  }
}
