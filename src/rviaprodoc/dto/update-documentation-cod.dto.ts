import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateDocumentationCodDto } from './create-documentation-cod.dto';

export class UpdateDocumentationCodDto extends PartialType(CreateDocumentationCodDto) {
  @IsString()
  idu_proyecto: string;
}
