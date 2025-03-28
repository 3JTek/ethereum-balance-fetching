import { Module } from '@nestjs/common';
import { AlchemyModule } from './alchemy/alchemy.module';
import { AlchemyService } from './alchemy/alchemy.service';
import { AppController } from './app.controller';

import { ConfigurationModule } from './config/config.module';
import { AppService } from './app.service';

@Module({
  imports: [ConfigurationModule, AlchemyModule],
  controllers: [AppController],
  providers: [AlchemyService, AppService],
})
export class AppModule {}
