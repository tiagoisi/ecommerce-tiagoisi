import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "./entities/orders.entity";
import { Repository } from "typeorm";
import { OrderDetails } from "src/order-details/entities/order-details.entity";
import { Products } from "src/products/entities/products.entity";
import { Users } from "src/users/entities/users.entity";

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Orders)
        private ordersRepository: Repository<Orders>,
        @InjectRepository(OrderDetails)
        private orderDetailRepository: Repository<OrderDetails>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Products)
        private productsRepository: Repository<Products>
    ) {}
    
    async addOrder(userId: string, products: any) {

        const user = await this.usersRepository.findOneBy({ id: userId }) 
        if (!user) {
            throw new NotFoundException(`Usuario con id ${userId} no encontrado`);
        }

        const order = new Orders();
        order.date = new Date();
        order.user = user;

        const newOrder = await this.ordersRepository.save(order);

    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productsRepository.findOneBy({
          id: element.id,
        });

        if (!product) {
          throw new NotFoundException( `Producto con id ${element.id} no encontrado`);
        }

        await this.productsRepository.update( 
          { id: element.id },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    const total = productsArray.reduce( 
      (sum, product) => sum + Number(product.price),
      0,
    );

    const orderDetail = new OrderDetails();

    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;
    await this.orderDetailRepository.save(orderDetail);

    return await this.ordersRepository.find({ 
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });
  }

    async getOrder(id: string) {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: { orderDetails: { products: true }, user: true }
        })
      
        if (!order) {
            throw new NotFoundException(`Orden con id ${id} no encontrada`);
      }
    }
}
