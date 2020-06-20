import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Job } from './job.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @OneToMany(() => Job, (job) => job.category)
    type: Job[];
}
