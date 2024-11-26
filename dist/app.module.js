"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("./config");
const config_2 = require("@nestjs/config");
const rviaprodoc_controller_1 = require("./rviaprodoc/rviaprodoc.controller");
const rviaprodoc_service_1 = require("./rviaprodoc/rviaprodoc.service");
const rviaprodoc_module_1 = require("./rviaprodoc/rviaprodoc.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: config_1.envs.dbHost,
                port: config_1.envs.dbPort,
                database: config_1.envs.dbName,
                username: config_1.envs.dbUsername,
                password: config_1.envs.dbPassword,
                autoLoadEntities: true,
                synchronize: false
            }),
            rviaprodoc_module_1.RviaprodocModule,
        ],
        controllers: [rviaprodoc_controller_1.RviaprodocController],
        providers: [config_2.ConfigService, rviaprodoc_service_1.RviaprodocService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map