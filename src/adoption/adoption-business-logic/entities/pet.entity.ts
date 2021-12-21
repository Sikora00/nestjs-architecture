export enum PetType {
  Dog,
  Cat,
}
export class Pet {
  type: PetType;
  id: string;
  constructor(public age: number) {}
}
