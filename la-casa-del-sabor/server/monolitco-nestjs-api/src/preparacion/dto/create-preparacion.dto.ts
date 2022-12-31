import { IsDate, IsEmail, IsMongoId, IsNotEmpty, IsNumber, MaxLength, MinLength  } from "class-validator";
import { Cocinero } from "src/cocinero/schema/cocinero.schema";
import { Receta } from "src/receta/schema/receta.schema";
export class CreatePreparacionDto {

    @IsNotEmpty()
    fecha: string;

    @IsNotEmpty()
    hora: string;

    @IsNotEmpty()
    @IsNumber()
    cantidad: number;

    @IsNotEmpty()
    @IsNumber()
    costo: number;

    @IsNotEmpty()
    tiempoEst : string

    @IsNotEmpty()
    @IsMongoId()
    idCocinero : Cocinero

    @IsNotEmpty()
    @IsMongoId()
    idReceta : Receta

}