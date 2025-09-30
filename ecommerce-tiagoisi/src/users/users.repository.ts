import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./entities/users.entity";

@Injectable()
export class UsersRepository {
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {}
    
    async getUsers(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const users = await this.usersRepository.find({ take: limit, skip: skip });
        return users.map(({ password, isAdmin, ...filteredUserData }) => filteredUserData);
    }

    async getUserById(id: string) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: { orders: true }
        })
        if (!user) return `No se encontro el usuario con id ${id}`;
        const { password, ...userNoPassword } = user;
        return userNoPassword; 
    }

    async addUser(user: Partial<Users>) {
        const newUser = await this.usersRepository.save(user);
        const dbUser = await this.usersRepository.findOneBy({ id: newUser.id });
        if (!dbUser) throw new Error(`No se encontro el usuario con id ${newUser.id}`);
        const { password, ...userNoPassword } = dbUser;
        return userNoPassword;
    }

    async updateUser(id: string, user: Partial<Users>) {
        await this.usersRepository.update(id, user);
        const updatedUser = await this.usersRepository.findOneBy({ id });
        if (!updatedUser) throw new Error(`No existe usuario con id ${id}`);
        const { password, ...userNoPassword } = updatedUser;
        return userNoPassword; 
    }

    async deleteUser(id: string) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: { orders: true }
        });
        if (!user) throw new NotFoundException(`No existe un usuario con el id ${id}`);
        if (user.orders && user.orders.length > 0) throw new BadRequestException('No se puede eliminar el usuario porque tiene ordenes asociadas');
        await this.usersRepository.remove(user);
        return { message: `Usuario ${user.name} eliminado con exito` };
    }

    async getUserByEmail(email: string) {
        return this.usersRepository.findOneBy({ email });
    }

}