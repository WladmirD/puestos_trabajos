import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Job } from './job.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    isActive = true;

    @OneToMany(() => Job, job => job.category)
    type: Job[];
}