import { Adoption } from "../entities/adoption.entity";

export abstract class AdoptionRepository {
  abstract findByPet(petId: string): Adoption | undefined;
  abstract insert(arg0: Adoption): void;
}