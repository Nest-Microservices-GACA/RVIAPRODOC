import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RviaprodocService } from './rviaprodoc.service';
import { CreateDocumentation } from './dto/create-documentation.dto';
import { CreateDocumentationCodigo } from './dto/create-documentation-cod.dto';

@Controller()
export class RviaprodocController {
  constructor(private readonly rviaprodocService: RviaprodocService) {}

  @MessagePattern({ cmd: 'addAppDocumentation' })
  async addAppDocumentation(
    @Payload() data: { id: number; createDocumentation: CreateDocumentation }
  ) {
    const { id, createDocumentation } = data;
    return this.rviaprodocService.addAppDocumentation(id, createDocumentation);
  }
  

  @MessagePattern({ cmd: 'addAppDocumentationCode' })
  async addAppDocumentationCode(
    @Payload() data: { id: number; createDocumentationCodigo: CreateDocumentationCodigo }
  ) {
    const { id, createDocumentationCodigo } = data;
    return this.rviaprodocService.addAppDocumentationCode(
      id,
      createDocumentationCodigo
    );
  }
}
