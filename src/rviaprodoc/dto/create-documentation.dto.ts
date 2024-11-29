import { Transform } from "class-transformer";
import { IsIn, IsNumber } from "class-validator";

export class CreateDocumentationDto {
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    @IsIn([1], {
        message: 'La opción debe ser 1',
    })
    opcArquitectura: number;

    constructor() {
        this.opcArquitectura = 1; 
    }
}