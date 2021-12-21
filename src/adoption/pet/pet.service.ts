import { Injectable } from '@nestjs/common';
import { Pet, PetType } from '../pet.entity';

@Injectable()
export class PetService {
  findById(petId: string): Pet {
    return new Pet(PetType.Cat, petId, 1);
  }
}
