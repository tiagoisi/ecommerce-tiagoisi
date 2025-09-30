import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateUserDto } from './dto/users.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    
    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(@Query('page') page?: string, @Query('limit') limit?: string) {
        if (page && limit) return this.userService.getUsers(Number(page), Number(limit));
        return this.userService.getUsers(1, 5);
    }

    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(AuthGuard)
    getUsersById(@Param('id', ParseUUIDPipe) id: string) {
        return this.userService.getUserById(id);
    }

    @ApiBearerAuth()
    @Put(':id') 
    @UseGuards(AuthGuard)
    updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: UpdateUserDto) {
        return this.userService.updateUser(id, user);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.userService.deleteUser(id)
    }
}
