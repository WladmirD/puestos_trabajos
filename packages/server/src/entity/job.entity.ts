import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { TimeWork } from './type.entity';
import { City } from './city.entity';
import { Category } from './category.entity';

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    posicion: string;

    @Column()
    categoryId: number;
    @ManyToOne(() => Category, (category) => category.type)
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @Column()
    address: string;

    @Column()
    cityId: number;
    @ManyToOne(() => City, (city) => city.city)
    @JoinColumn({ name: 'cityId' })
    city: City;

    @Column()
    userId: number;
    @ManyToOne(() => User, (user) => user.jobs)
    @JoinColumn({ name: 'userId' })
    owner: User;

    @Column()
    typeId: number;
    @ManyToOne(() => TimeWork, (timework) => timework.type)
    @JoinColumn({ name: 'typeId' })
    type: TimeWork;

    @Column()
    url_logo = '';

    @Column('text')
    description: string;

    @Column({ type: 'date', default: () => 'NOW()' })
    created_time: Date;
}
