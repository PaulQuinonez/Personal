import { IsNotEmpty } from "class-validator";

export class CreateRecetaDto {

    @IsNotEmpty()
    nombre: string;

    @IsNotEmpty()
    nIngredientes: string;

}
