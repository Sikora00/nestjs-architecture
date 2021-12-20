import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { AdoptionService } from './adoption.service';

@Module({
  providers: [AdoptionService],
  exports: [AdoptionService],
})
export class AdoptionBusinessLogicModule {
  static withAdapters(adapters: ModuleMetadata['imports']): DynamicModule {
    return {
      module: AdoptionBusinessLogicModule,
      imports: adapters,
    };
  }
}
