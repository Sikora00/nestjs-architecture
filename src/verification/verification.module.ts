import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';

@Module({
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}
