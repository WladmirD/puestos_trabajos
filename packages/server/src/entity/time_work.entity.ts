import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Job } from './job.entity';

@Entity()
export class TimeWork {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Job, (job) => job.type)
    type: Job[];
}
