import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config';
import { RviaprodocModule } from './rviaprodoc/rviaprodoc.module';
import { Applicationstatus } from './rviaprodoc/dto/applicationstatus.entity';
import { Application, CreateRviadocDto } from './rviaprodoc/dto';
import { Checkmarx } from './rviaprodoc/dto/checkmarx.entity';
import { Cost } from './rviaprodoc/dto/cost.entity';
import { Position } from './rviaprodoc/dto/position.entity';
import { Scan } from './rviaprodoc/dto/scan.entity';
import { Sourcecode } from './rviaprodoc/dto/sourcecode.entity';
import { User } from './rviaprodoc/dto/user.entity';
import { UsersApplication } from './rviaprodoc/dto/users-application.entity';

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
      synchronize:false,
      entities: 
      [
        Application, 
        Applicationstatus,
        Checkmarx,
        Cost,
        CreateRviadocDto,
        Position,
        Scan,
        Sourcecode,
        User,
        UsersApplication,
      ]
    }),
    RviaprodocModule,    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
