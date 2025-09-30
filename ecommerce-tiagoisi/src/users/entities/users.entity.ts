import { Orders } from 'src/orders/entities/orders.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name:'users'
})
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    name: string

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false
    })
    email: string

    @Column({
        type: 'varchar',
        length: 60,
        nullable: false
    })
    password: string

    @Column({
        type: 'int'
    })
    phone: number

    @Column({
        type: 'varchar',
        length: 50
    })
    country: string

    @Column({
        type: 'text'
    })
    address: string

    @Column({
        type: 'varchar',
        length: 50
    })
    city: string

    @Column({
        default: false
    })
    isAdmin: boolean

    @OneToMany(() => Orders, (order) => order.user)
    @JoinColumn({ name: 'order_id' })
    orders: Orders[];
}
