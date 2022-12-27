import { IsEmail, IsNotEmpty, IsNumber, MaxLength, MinLength  } from "class-validator";

export class CreateCocineroDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    sueldo: number;

}
