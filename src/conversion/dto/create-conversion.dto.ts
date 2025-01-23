import { IsNumber, IsString, Min, IsDecimal } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateConversionDto {

    @ApiProperty({ type: Number })
    @IsNumber()
    @Min(0)
    @IsDecimal({ decimal_digits: "2" })
    readonly amount: number;

    @ApiProperty({ type: String })
    @IsString()
    readonly from: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly to: string;

    @ApiProperty({ type: Number })
    @IsNumber()
    @Min(0)
    @IsDecimal({ decimal_digits: "2" })
    readonly rate: number;

}