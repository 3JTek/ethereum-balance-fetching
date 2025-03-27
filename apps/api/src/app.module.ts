import { Module } from '@nestjs/common';
import { AlchemyModule } from './alchemy/alchemy.module';
import { AlchemyService } from './alchemy/alchemy.service';
import { AppController } from './app.controller';

import { ConfigurationModule } from './config/config.module';

@Module({
  imports: [ConfigurationModule, AlchemyModule],
  controllers: [AppController],
  providers: [AlchemyService],
})
export class AppModule {}
