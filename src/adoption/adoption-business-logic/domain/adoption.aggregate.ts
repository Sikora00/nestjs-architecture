import { Age } from './age';

export interface AdoptResult {
  id: string;
  adoptedAt: Date;
  clientId: string;
  petId: string;
}
export class Adoption {
  constructor(
    private pet: Pet,
    private isAlreadyAdopted: boolean,
    private canClientAdopt: boolean,
    private agePolicy: AgePolicy,
  ) {}

  adopt(clientId: string): AdoptResult {
    if (this.isAlreadyAdopted) {
      throw new Error('The pet is already adopted');
    }

    if (!this.canClientAdopt) {
      throw new Error(`This customer can't adopt`);
    }

    if (!this.agePolicy(this.pet.age)) {
      throw new Error(`This pet is too young`);
    }

    return { id: 'newId', clientId, petId: this.pet.id, adoptedAt: new Date() };
  }
}

enum PetType {
  Dog,
  Cat,
}

class Pet {
  constructor(public id: string, public age: Age) {}
}

type AgePolicy = (age: Age) => boolean;

const dogAgePolicy: AgePolicy = (age: Age) => {
  return !age.isLessThan(Age.halfOfYear());
};

const catAgePolicy: AgePolicy = (age: Age) => {
  return !age.isLessThan(Age.oneYear());
};
export function AdoptionFactory(
  pet: { type: PetType; age: Age; id: string },
  canAdopt: boolean,
  isAlreadyAdopted: boolean,
): Adoption {
  let agePolicy: AgePolicy;
  switch (pet.type) {
    case PetType.Cat:
      agePolicy = catAgePolicy;
      break;
    case PetType.Dog:
      agePolicy = dogAgePolicy;
      break;
    default:
      throw new Error('Unknown pet type');
  }
  return new Adoption(
    new Pet(pet.id, pet.age),
    isAlreadyAdopted,
    canAdopt,
    agePolicy,
  );
}
