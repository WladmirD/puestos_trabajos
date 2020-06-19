import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Configuration {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    NumPagination: number;
}
