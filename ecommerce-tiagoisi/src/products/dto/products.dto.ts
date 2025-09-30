import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";
import { Categories } from "src/categories/entities/categories.entity";

export class ProductDto {
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString({ message: 'El nombre debe ser un texto' })
    @MinLength(5, { message: 'El nombre debe tener al menos 5 caracteres' })
    @ApiProperty({
        example: "Redragon Kumara K552"
    })
    name: string;

    @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
    @IsString({ message: 'La descripción debe ser un texto' })
    @MinLength(10, { message: 'La descripción debe tener al menos 10 caracteres' })
    @ApiProperty({
        example: 'The legendary keyboard'
    })
    description: string;

    /** @example 54.99 */
    @IsNotEmpty({ message: 'El precio no puede estar vacío' })
    @IsNumber({}, { message: 'El precio debe ser un número' })
    @IsPositive({ message: 'El precio debe ser un número positivo' })
    price: number;

    /** @example https://ih1.redbubble.net/image.1861329650.2941/fposter,small,wall_texture,product,750x1000.webp */
    @IsNotEmpty({ message: 'La url de la imagen no puede estar vacia' })
    imgUrl: string

    /** @example 14 */
    @IsNotEmpty({ message: 'El stock no puede estar vacío' })
    @IsInt({ message: 'El stock debe ser un número entero' })
    @IsPositive({ message: 'El stock debe ser un número positivo' })
    stock: number;

    /** @example keyboard */
    @IsString()
    @IsNotEmpty()
    category: string; 
}

export class UpdateProductDto {
    @IsEmpty({ message: 'El nombre no se puede modificar!' })
    @ApiHideProperty()
    name?: string

    /** @example The most iconic keyboard */
    @IsString()
    @IsOptional()
    @MinLength(10)
    description?: string

    /** @example 59.99 */
    @IsNumber()
    @IsOptional()
    @Min(0)
    price?: number

    /** @example 12 */
    @IsNumber()
    @IsOptional()
    @Min(0)
    stock?: number

    @IsEmpty({ message: 'La categoria no se puede modificar' })
    @ApiHideProperty()
    category?: Categories
}