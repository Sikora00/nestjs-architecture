export enum PetType {
  Dog,
  Cat,
}
export class Pet {
  constructor(public type: PetType, public id: string, public age: number) {}
}
