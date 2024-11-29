import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateDocumentationDto } from './create-documentation.dto';

export class UpdateDocumentationDto extends PartialType(CreateDocumentationDto) {
  @IsString()
  idu_proyecto: string;
}
