import { Adoption, AdoptResult } from '../domain/adoption.aggregate';

export abstract class AdoptionRepository {
  abstract get(petId: string, clientId: string): Adoption;
  abstract insert(adoption: AdoptResult): void;
}
