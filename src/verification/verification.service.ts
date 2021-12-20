import { Injectable } from '@nestjs/common';

@Injectable()
export class VerificationService {
  canAdopt(clientId: string) {
    return true;
  }
}
