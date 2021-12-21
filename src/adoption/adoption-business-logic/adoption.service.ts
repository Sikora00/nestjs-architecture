import { Injectable } from '@nestjs/common';
import { AdoptionRepository } from './ports/adoption.repository';

@Injectable()
export class AdoptionService {
  constructor(private adoptionRepository: AdoptionRepository) {}

  async adopt(petId: string, clientId: string): Promise<void> {
    try {
      const adoption = await this.adoptionRepository.get(petId, clientId);
      const result = adoption.adopt(clientId);

      await this.adoptionRepository.insert(result);
    } catch (e) {
      if (e.message === 'This pet is too young') {
        this.reserve(petId, clientId);
        throw new Error('This pet is too young. Reserved');
      }
      throw e;
    }
  }

  private reserve(petId: string, clientId: string) {
    throw new Error('Method not implemented.');
  }
}
