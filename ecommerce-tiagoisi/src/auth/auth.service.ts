import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from 'src/users/entities/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor (
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService
    ) {}

    getAuth() {
        return 'Autenticacion';
    }

    async signIn(email: string, password: string) {
        const foundUser = await this.usersRepository.getUserByEmail(email);
        if (!foundUser) throw new BadRequestException('Credenciales incorrectas');

        const validPassword = await bcrypt.compare(password, foundUser.password);
        if (!validPassword) throw new BadRequestException('Credenciales incorrectas');

        const payload = {id: foundUser.id, email: foundUser.email, isAdmin: foundUser.isAdmin};
        const token = this.jwtService.sign(payload)
        return { message: 'Usuario logeado con exito', token }
    }

    async signUp(user: Partial<Users>) {
        const { email, password } = user;

        if (!email || !password) throw new BadRequestException('Se necesita email y password');
        const foundUser = await this.usersRepository.getUserByEmail(email);
        if (foundUser) throw new BadRequestException('Email ya registrado');

        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) throw new BadRequestException('Error al hashear contraseña');

        return await this.usersRepository.addUser({ ...user, password: hashedPassword })
    }
}
