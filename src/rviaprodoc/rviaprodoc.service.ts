import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { RpcException } from '@nestjs/microservices';
import { UpdateDocumentationDto } from './dto/update-documentation';
import { UpdateDocumentationCodDto } from './dto/update-documentation-cod.dto';
 
const addon = require(process.env.RVIA_PATH);

@Injectable()
export class RviaprodocService {

  private readonly logger = new Logger('ApplicationsService');
  private readonly crviaEnvironment: number;

  constructor(
    @InjectRepository(Application)
    private readonly appRepository: Repository<Application>,
  ) {}

  async findOne(id: number) {
    const aplicacion = await this.appRepository.findOneBy({ idu_aplicacion: id });

    if (!aplicacion)
      throw new NotFoundException(`Aplicación con ${id} no encontrado `);

    return aplicacion;
  }

  async addAppDocumentation(idu_proyecto: string, UpdateDocumentationDto: UpdateDocumentationDto) {
    const app = await this.appRepository.findOne({ where: { idu_proyecto: idu_proyecto } });
    if ( !app ) {
      this.logger.error('[rviaprodoc.addAppDocumentation.service]');
      throw new RpcException({
        status: 404,
        message: `App ${ idu_proyecto } no encontrada`,
      });
    }

    app.opc_arquitectura = {
      ...app.opc_arquitectura,
      [UpdateDocumentationDto.opcArquitectura]: true,
    };

    app.opc_estatus_doc = 1;
    await this.appRepository.save(app);

    // TODO: Implementar lógica para llamar a addons
    
    return {
      message: `Test case añadido a la aplicación ${idu_proyecto}`,
      application: app
    };
  }

  async addAppDocumentationCode(idu_proyecto: string, updateDocumentationCodDto: UpdateDocumentationCodDto) {
    const app = await this.appRepository.findOne({ where: { idu_proyecto: idu_proyecto } });
    if ( !app ) {
      this.logger.error('[test-cases.addAppTestCases.service]');
      throw new RpcException({
        status: 404,
        message: `App ${ idu_proyecto } no encontrada`,
      });
    }

    app.opc_arquitectura = {
      ...app.opc_arquitectura,
      [updateDocumentationCodDto.opcArquitectura]: true,
    };

    app.opc_estatus_doc_code = 2;
    await this.appRepository.save(app);

    // TODO: Implementar lógica para llamar a addons
    
    return {
      message: `Test case añadido a la aplicación ${idu_proyecto}`,
      application: app
    };
  }
}
