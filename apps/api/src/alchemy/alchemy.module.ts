import { Module } from '@nestjs/common';
import { AlchemyService } from './alchemy.service';

@Module({
  providers: [AlchemyService]
})
export class AlchemyModule {}
