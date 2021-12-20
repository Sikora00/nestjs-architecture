import { Injectable } from '@nestjs/common';
import { VerificationService } from '../../verification/verification.service';
import { CanClientAdoptPet } from '../adoption-business-logic/ports/can-client-adopt-pet';

@Injectable()
export class CanClientAdoptPetAdapter implements CanClientAdoptPet {
  constructor(private verificationService: VerificationService) {}
  canAdopt(clientId: string): boolean {
    return this.verificationService.canAdopt(clientId);
  }
}
