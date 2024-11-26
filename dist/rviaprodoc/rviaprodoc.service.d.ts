import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { CommonService } from 'src/common/common.service';
import { CreateDocumentation } from './dto/create-documentation.dto';
import { CreateDocumentationCodigo } from './dto/create-documentation-cod.dto';
import { ConfigService } from '@nestjs/config';
export declare class RviaprodocService {
    private readonly applicationRepository;
    private readonly encryptionService;
    private readonly configService;
    private readonly logger;
    private readonly crviaEnvironment;
    constructor(applicationRepository: Repository<Application>, encryptionService: CommonService, configService: ConfigService);
    findOne(id: number): Promise<Application>;
    addAppDocumentation(id: number, createDocumentation: CreateDocumentation): Promise<Application>;
    addAppDocumentationCode(id: number, createDocumentationCodigo: CreateDocumentationCodigo): Promise<Application>;
    private handleDBExceptions;
}
