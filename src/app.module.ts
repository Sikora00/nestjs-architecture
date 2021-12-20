import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdoptionPrimaryAdaptersModule } from './adoption/adoption-primary-adapters/adoption-primary-adapters.module';

@Module({
  imports: [AdoptionPrimaryAdaptersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
