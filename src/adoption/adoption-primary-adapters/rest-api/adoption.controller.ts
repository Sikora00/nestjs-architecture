import { Controller, Param, Post } from '@nestjs/common';
import { AdoptionService } from 'src/adoption/adoption-business-logic/adoption.service';

@Controller('')
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @Post('adopt/:petId')
  adopt(
    @Param('petId') petId: string,
    clientId: string | undefined = 'xyz',
  ): Promise<void> {
    return this.adoptionService.adopt(petId, clientId);
  }
}
