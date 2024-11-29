import { Module } from '@nestjs/common';
import { RviaprodocService } from './rviaprodoc.service';
import { RviaprodocController } from './rviaprodoc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE } from 'src/config';
import { Application } from './entities/application.entity';


@Module({
  controllers: [RviaprodocController],
  providers: [RviaprodocService],
  imports:[
    TypeOrmModule.forFeature([ Application ]),
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
