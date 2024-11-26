import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config';
import { ConfigService } from '@nestjs/config';
import { RviaprodocController } from './rviaprodoc/rviaprodoc.controller';
import { RviaprodocService } from './rviaprodoc/rviaprodoc.service';
import { RviaprodocModule } from './rviaprodoc/rviaprodoc.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host: envs.dbHost,
      port: envs.dbPort,
      database: envs.dbName,
      username: envs.dbUsername,
      password: envs.dbPassword,
      autoLoadEntities: true,
      synchronize:false
    }),
    RviaprodocModule,    
  ],
  controllers: [RviaprodocController],
  providers: [ConfigService, RviaprodocService],
})
export class AppModule {}
