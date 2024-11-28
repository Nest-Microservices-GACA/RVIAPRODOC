import { Module } from '@nestjs/common';
import { RviaprodocService } from './rviaprodoc.service';
import { RviaprodocController } from './rviaprodoc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE } from 'src/config';
import { Checkmarx } from './dto/checkmarx.entity';
import { Application } from './dto/application.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [RviaprodocController],
  providers: [RviaprodocService],
  imports:[
    TypeOrmModule.forFeature([ Application ]),
    CommonModule,
    ConfigModule,
    ClientsModule.register([
      { 
        name: NATS_SERVICE, 
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers
        }
      },
    ]),
  ],
  exports:[
    //TypeOrmModule
  ]
})
export class RviaprodocModule {}
