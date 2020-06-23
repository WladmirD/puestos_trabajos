import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { TimeWork } from './time_work.entity';
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
    @ManyToOne(() => Category, (category) => category.type, { eager: true })
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @Column()
    address: string;

    @Column()
    cityId: number;
    @ManyToOne(() => City, (city) => city.city, { eager: true })
    @JoinColumn({ name: 'cityId' })
    city: City;

    @Column()
    userId: number;
    @ManyToOne(() => User, (user) => user.jobs, { eager: true })
    @JoinColumn({ name: 'userId' })
    owner: User;

    @Column()
    typeId: number;
    @ManyToOne(() => TimeWork, (timework) => timework.type, { eager: true })
    @JoinColumn({ name: 'typeId' })
    type: TimeWork;

    @Column({ type: 'character', length: 100, default: '/src', nullable: true })
    url_logo: string;

    @Column('text')
    description: string;

    @Column({ type: 'date', default: () => 'NOW()' })
    created_time: Date;
}
