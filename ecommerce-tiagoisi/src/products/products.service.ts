import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Products } from "./entities/products.entity";
import { ProductDto } from "./dto/products.dto";

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) { }
    
    getProducts(page: number, limit: number) {
        return this.productsRepository.getProducts(page, limit)
    }

    getProduct(id: string) {
        return this.productsRepository.getProduct(id)
    }

    addProducts() {
        return this.productsRepository.addProducts()
    }

    createProduct(product: ProductDto) {
        return this.productsRepository.createProduct(product);
    }

    updateProduct(id: string, product: Partial<Products>) {
        return this.productsRepository.updateProduct(id, product);
    }

    deleteProduct(id: string) {
        return this.productsRepository.deleteProduct(id);
    }
}
