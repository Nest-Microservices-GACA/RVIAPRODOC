import { RviaprodocService } from './rviaprodoc.service';
import { CreateDocumentation } from './dto/create-documentation.dto';
import { CreateDocumentationCodigo } from './dto/create-documentation-cod.dto';
export declare class RviaprodocController {
    private readonly rviaprodocService;
    constructor(rviaprodocService: RviaprodocService);
    addAppDocumentation(data: {
        id: number;
        createDocumentation: CreateDocumentation;
    }): Promise<import("./entities/application.entity").Application>;
    addAppDocumentationCode(data: {
        id: number;
        createDocumentationCodigo: CreateDocumentationCodigo;
    }): Promise<import("./entities/application.entity").Application>;
}
