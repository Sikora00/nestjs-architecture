import { Injectable } from '@nestjs/common';

@Injectable()
export class VerificationService {
  canAdopt() {
    return true;
  }
}
