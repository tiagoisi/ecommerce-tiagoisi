import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Max, MaxLength, MinLength, Validate } from "class-validator";
import { MatchPassword } from "src/decorators/match-password.decorator";

export class CreateUserDto {
    @IsNotEmpty({message: 'El nombre no puede estar vacio!'})
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @ApiProperty({
        description: 'El nombre del usuario, debe tener como minimo 3 caracteres',
        example: 'User Test'
    })
    name: string;

    @IsNotEmpty({message: 'El email no puede estar vacio!'})
    @MaxLength(50)
    @IsEmail()
    @ApiProperty({
        description: 'El email del usuario debe ser uno valido',
        example: 'example@gmail.com'
    })
    email: string;

    @IsNotEmpty()
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }, {
        message: 'La contraseña debe tener al menos una minuscula, una mayuscula, un numero y un simbolo!'
    })
    @MinLength(8)
    @MaxLength(15)
    @ApiProperty({
        description: 'La contraseña debe tener al menos una minuscula, una mayuscula, un numero y un simbolo',
        example: 'Password23$'
    })
    password: string;

    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    @ApiProperty({
        description: 'La contraseña debe coincidir con la anterior',
        example: 'Password23$'
    })
    confirmPassword: string

    @IsString()
    @MinLength(3)
    @MaxLength(80)
    @ApiProperty({
        description: 'La direccion debe tener entre minimo 3 caracteres y maximo 80',
        example: '350 5th Ave, New York, NY 10118'
    })
    address: string;

    @IsNotEmpty()
    @IsNumber()
    @IsInt({message: 'El numero de telefono debe ser un numero entero'})
    @Max(2147483647, { message: 'El número de teléfono es demasiado largo' })
    @ApiProperty({
        description: 'El numero de telefono debe ser entero y no debe execer los diez caracteres',
        example: 12345678
    })
    phone: number;

    @MinLength(5)
    @MaxLength(20)
    @ApiProperty({
        description: 'El pais debe tener como minimo 5 caracteres y maximo 20',
        example: "Estados Unidos"
    })
    country: string;

    @MinLength(5)
    @MaxLength(20)
    @ApiProperty({
        description: 'La ciudad debe tener como minimo 5 caracteres y maximo 20',
        example: "New York"
    })
    city: string;

    @IsEmpty()
    @ApiHideProperty()
    isAdmin: boolean;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()   
    @MinLength(3)
    @MaxLength(50)
    @ApiProperty({
        description: 'El nombre del usuario, debe tener como minimo 3 caracteres',
        example: 'User Test Edited'
    })
    name: string;

    @IsOptional()
    @MaxLength(50)
    @IsEmail()
    @ApiProperty({
        description: 'El email del usuario debe ser uno valido',
        example: 'example@gmail.com'
    })
    email: string;

    @IsOptional()
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }, {
        message: 'La contraseña debe tener al menos una minuscula, una mayuscula, un numero y un simbolo!'
    })
    @MinLength(8)
    @MaxLength(15)
    @ApiHideProperty()
    password: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    @ApiProperty({
        description: 'La direccion debe tener entre minimo 3 caracteres y maximo 80',
        example: '5 Avenue, Paris, Île-de-France 75007'
    })
    address: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty({
        description: 'El numero de telefono debe ser entero y no debe execer los diez caracteres',
        example: 12345678
    })
    phone: number;

    @IsOptional()
    @MinLength(5)
    @MaxLength(20)
    @ApiProperty({
        description: 'El pais debe tener como minimo 5 caracteres y maximo 20',
        example: "Francia"
    })
    country: string;

    @IsOptional()
    @MinLength(5)
    @MaxLength(20)
    @ApiProperty({
        description: 'La ciudad debe tener como minimo 5 caracteres y maximo 20',
        example: "Paris"
    })
    city: string;

    @IsEmpty()
    @ApiHideProperty()
    isAdmin: boolean;
}

export class LoginUserDto {
    @IsNotEmpty({message: 'El email no puede estar vacio!'})
    @MaxLength(50)
    @IsEmail()
    @ApiProperty({
        description: 'El email del usuario debe ser uno valido',
        example: 'example@gmail.com'
    })
    email: string;

    @IsNotEmpty()
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }, {
        message: 'La contraseña debe tener al menos una minuscula, una mayuscula, un numero y un simbolo!'
    })
    @MinLength(8)
    @MaxLength(15)
    @ApiProperty({
        description: 'La contraseña debe tener al menos una minuscula, una mayuscula, un numero y un simbolo',
        example: 'Password23$'
    })
    password: string;
}