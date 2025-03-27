import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Global() // makes the module available globally for other modules once imported in the app modules
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development.local'}`,
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigurationModule {}
