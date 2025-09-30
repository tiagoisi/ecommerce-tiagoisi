import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "./entities/products.entity";
import { Repository } from "typeorm";
import { Categories } from "src/categories/entities/categories.entity";
import * as data from '../utils/data.json';
import { ProductDto } from "./dto/products.dto";

@Injectable()
export class ProductsRepository {
    constructor(@InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>
    ) {}
    
    async getProducts(page: number, limit: number) {
        let products = await this.productsRepository.find({
            relations: {
              category: true
            }
         })
        const start = (page - 1) * limit;
        const end = start + limit;
        products = products.slice(start, end);
        return products;
    }

    async getProduct(id: string) {
        const product = await this.productsRepository.findOneBy({ id });
        if (!product) throw new NotFoundException(`Producto con id ${id} no encontrado`)
        return product;
    }

    async addProducts() {
        const categories = await this.categoriesRepository.find();
        await Promise.all(
            data.map(async (element) => {
                const category = categories.find((category) => category.name === element.category)
                if (!category) throw new Error(`La categoria ${element.category} no existe`);

                const product = new Products();
                product.name = element.name;
                product.description = element.description;
                product.price = element.price;
                product.stock = element.stock;
                product.category = category;
                await this.productsRepository
                .createQueryBuilder()
                .insert()
                .into(Products)
                .values(product)
                .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
                .execute()
            })
        )
        return 'Productos agregados con exito'
    }

    async createProduct(product: ProductDto) {
    
        const productFound = await this.productsRepository.findOne({
            where: { name: product.name },
        });

        if (productFound) {
            throw new BadRequestException(`El producto ${productFound.name} ya existe`);
        }

        const category = await this.categoriesRepository.findOne({
            where: { name: product.category },
        });

        if (!category) {
            throw new BadRequestException(`La categoría ${product.category} no existe`);
        }

        const newProduct = new Products();
        newProduct.name = product.name;
        newProduct.description = product.description;
        newProduct.price = product.price;
        newProduct.stock = product.stock;
        newProduct.imgUrl = product.imgUrl;

        newProduct.category = category;
        return await this.productsRepository.save(newProduct);
    }

    async updateProduct(id: string, product: Partial<Products>) {
        await this.productsRepository.update(id, product)
        const updateProduct = await this.productsRepository.findOneBy({ id })
        return updateProduct;
    }

    async deleteProduct(id: string) {
        const result = await this.productsRepository.delete(id);
        if (result.affected === 0) throw new BadRequestException(`Producto con id ${id} no encontrado`);
        return `Producto con id ${id} eliminado correctamente`;
    }
} 




