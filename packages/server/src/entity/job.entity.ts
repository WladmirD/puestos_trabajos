import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from './user';
import { TimeWork } from './type';
import {City } from './city';
import { Category } from './category';

@Entity()
export class Job{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    posicion: string;

    @Column()
    categoryId: number;
    @ManyToOne(() => Category, category => category.type)
    @JoinColumn({ name: "categoryId" })
    category: Category;

    @Column()
    address: string;

    @Column()
    cityId: number;
    @ManyToOne(() => City, city => city.city)
    @JoinColumn({ name: "cityId" })
    city: City;

    @Column()
    userId: number;
    @ManyToOne(() => User, user => user.jobs)
    @JoinColumn({ name: "userId" })
    owner: User;

    @Column()
    typeId: number;
    @ManyToOne(() => TimeWork, timework => timework.type)
    @JoinColumn({ name: "typeId" })
    type: TimeWork;

    @Column()
    url_logo = '';

    @Column("text")
    description: string;

    @Column({ type: 'date', default: () => 'NOW()'})
    created_time: Date;
}