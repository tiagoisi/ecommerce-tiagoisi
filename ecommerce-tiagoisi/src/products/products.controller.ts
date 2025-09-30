import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { ProductDto, UpdateProductDto } from './dto/products.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

        @Get()
        @ApiOkResponse({ type: [ProductDto] })
        getProducts(@Query('page') page?: string, @Query('limit') limit?: string) {
            if (page && limit) return this.productsService.getProducts(Number(page), Number(limit));
            return this.productsService.getProducts(1, 5);
        }
        
        @Get('seeder')
        addProducts() {
            return this.productsService.addProducts();
        }
    
        @Get(':id')
        getProductsById(@Param('id', ParseUUIDPipe) id: string) {
            return this.productsService.getProduct(id);
        }
    
        @ApiBearerAuth()
        @Post()
        @UseGuards(AuthGuard)
        createProduct(@Body() product: ProductDto) {
            return this.productsService.createProduct(product);
        }
    
        @ApiBearerAuth()
        @Put(':id')
        @Roles(Role.Admin) 
        @UseGuards(AuthGuard, RolesGuard)
        updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product: UpdateProductDto) {
            return this.productsService.updateProduct(id, product);
        }
    
        @ApiBearerAuth()
        @Delete(':id')
        @UseGuards(AuthGuard)
        deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
            return this.productsService.deleteProduct(id);   
        }
}
