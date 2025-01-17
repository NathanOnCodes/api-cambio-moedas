import { IsNumber, isEmpty, IsString, Min, IsDecimal, MIN } from "class-validator";

export class CreateConversionDto {
    @IsNumber()
    @Min(0)
    @IsDecimal({ decimal_digits: "2" })
    readonly amount: number;

    @IsString()
    readonly from: string;

    @IsString()
    readonly to: string;

    @IsNumber()
    @Min(0)
    @IsDecimal({ decimal_digits: "2" })
    readonly rate: number;

}