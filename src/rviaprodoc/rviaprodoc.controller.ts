import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RviaprodocService } from './rviaprodoc.service';
import { UpdateDocumentationDto } from './dto/update-documentation';
import { UpdateDocumentationCodDto } from './dto/update-documentation-cod.dto';

@Controller()
export class RviaprodocController {
  constructor(private readonly rviaprodocService: RviaprodocService) {}

  @MessagePattern('rviaprodoc.addAppDocumentation')
  async addAppDocumentation(@Payload() updateDocumentationDto: UpdateDocumentationDto) {
    return this.rviaprodocService.addAppDocumentation(updateDocumentationDto.idu_proyecto,updateDocumentationDto);
  }
  
  @MessagePattern('rviaprodoc.addAppDocumentationCode')
  async addAppDocumentationCode(@Payload() updateDocumentationCodDto: UpdateDocumentationCodDto) {
    return this.rviaprodocService.addAppDocumentationCode(updateDocumentationCodDto.idu_proyecto,updateDocumentationCodDto);
  }

}
