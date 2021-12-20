import { Injectable } from '@nestjs/common';
import { Pet } from '../pet.entity';

@Injectable()
export class PetService {
  findById(petId: string): Pet {
    return new Pet(1);
  }
}
