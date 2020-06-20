import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    CreateDateColumn,
    Unique,
} from 'typeorm';
import { Job } from './job.entity';
import { Role } from './role.entity';

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    roleId: number;
    @ManyToOne(() => Role, (role) => role.type)
    @JoinColumn({ name: 'roleId' })
    type: Role;

    @Column({ type: 'char', length: 100, default: '/src' })
    url: string;

    @CreateDateColumn()
    created_At: Date;

    @OneToMany(() => Job, (job) => job.owner)
    jobs: Job[];
}
