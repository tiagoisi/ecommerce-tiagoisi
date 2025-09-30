import { Categories } from "src/categories/entities/categories.entity";
import { OrderDetails } from "src/order-details/entities/order-details.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'products'
})
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false
    })
    name: string

    @Column({
        type: 'text',
        nullable: false
    })
    description: string

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number
    
    @Column({
        type: 'int',
        nullable: false
    })
    stock: number
    
    @Column({
        type: 'text',
        default: 'https://ih1.redbubble.net/image.1861329650.2941/fposter,small,wall_texture,product,750x1000.webp'
    })
    imgUrl: string

    @ManyToOne(() => Categories, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Categories

    @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    orderDetails: OrderDetails[]
}