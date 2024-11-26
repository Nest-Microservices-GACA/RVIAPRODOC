"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RviaprodocService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const application_entity_1 = require("./entities/application.entity");
const common_service_1 = require("../common/common.service");
const config_1 = require("@nestjs/config");
const addon = require(process.env.RVIA_PATH);
let RviaprodocService = class RviaprodocService {
    constructor(applicationRepository, encryptionService, configService) {
        this.applicationRepository = applicationRepository;
        this.encryptionService = encryptionService;
        this.configService = configService;
        this.logger = new common_1.Logger('ApplicationsService');
        this.crviaEnvironment = Number(this.configService.get('RVIA_ENVIRONMENT'));
    }
    async findOne(id) {
        const aplicacion = await this.applicationRepository.findOneBy({ idu_aplicacion: id });
        if (!aplicacion)
            throw new common_1.NotFoundException(`Aplicación con ${id} no encontrado `);
        return aplicacion;
    }
    async addAppDocumentation(id, createDocumentation) {
        try {
            const obj = new addon.CRvia(this.crviaEnvironment);
            const application = await this.applicationRepository.findOne({
                where: { idu_aplicacion: id }
            });
            if (!application)
                throw new common_1.NotFoundException(`Aplicación con ID ${id} no encontrado`);
            const lEmployee = application.user.numero_empleado;
            const ruta_proyecto = this.encryptionService.decrypt(application.sourcecode.nom_directorio);
            const iResult = obj.createOverviewDoc(lEmployee, ruta_proyecto);
            if (iResult >= 600 && iResult <= 699)
                throw new common_1.BadRequestException('Error');
            application.opc_arquitectura = {
                ...application.opc_arquitectura,
                [createDocumentation.opcArquitectura]: true,
            };
            application.opc_estatus_doc = 2;
            await this.applicationRepository.save(application);
            application.nom_aplicacion = this.encryptionService.decrypt(application.nom_aplicacion);
            return application;
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }
    async addAppDocumentationCode(id, createDocumentationCodigo) {
        try {
            const obj = new addon.CRvia(this.crviaEnvironment);
            const application = await this.applicationRepository.findOne({
                where: { idu_aplicacion: id }
            });
            if (!application)
                throw new common_1.NotFoundException(`Aplicación con ID ${id} no encontrado`);
            const lEmployee = application.user.numero_empleado;
            const ruta_proyecto = this.encryptionService.decrypt(application.sourcecode.nom_directorio);
            const iResult = obj.createOverviewDoc(lEmployee, ruta_proyecto);
            if (iResult >= 600 && iResult <= 699)
                throw new common_1.BadRequestException('Error');
            application.opc_arquitectura = {
                ...application.opc_arquitectura,
                [createDocumentationCodigo.opcArquitectura]: true,
            };
            application.opc_estatus_doc_code = 2;
            await this.applicationRepository.save(application);
            application.nom_aplicacion = this.encryptionService.decrypt(application.nom_aplicacion);
            return application;
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }
    handleDBExceptions(error) {
        if (error.code === '23505')
            throw new common_1.BadRequestException(error.detail);
        if (error.response)
            throw new common_1.BadRequestException(error.message);
        this.logger.error(error);
        throw new common_1.InternalServerErrorException('Unexpected error, check server logs');
    }
};
exports.RviaprodocService = RviaprodocService;
exports.RviaprodocService = RviaprodocService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(application_entity_1.Application)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        common_service_1.CommonService,
        config_1.ConfigService])
], RviaprodocService);
//# sourceMappingURL=rviaprodoc.service.js.map