import { createConnection, getRepository } from 'typeorm';
import faker from 'faker';
import { User } from '../entity/user.entity';
import { Role } from '../entity/role.entity';
import { Configuration } from '../entity/configuration.entity';
import { City } from '../entity/city.entity';
import { Category } from '../entity/category.entity';
import { Job } from '../entity/job.entity';
import { TimeWork } from '../entity/time_work.entity';

async function populatedb() {
    await createConnection();
    await getRepository(Role)
        .createQueryBuilder()
        .insert()
        .values([{ name: 'Administrador' }, { name: 'Poster' }, { name: 'User' }])
        .execute();
    await getRepository(Configuration)
        .createQueryBuilder()
        .insert()
        .values([{ NumPagination: 20 }])
        .execute();
    await getRepository(City)
        .createQueryBuilder()
        .insert()
        .values([
            { name: 'Santo Domingo' },
            { name: 'Santiago' },
            { name: 'La Romana' },
            { name: 'Puerto Plata' },
        ])
        .execute();
    await getRepository(TimeWork)
        .createQueryBuilder()
        .insert()
        .values([{ name: 'Full-Time' }, { name: 'Part-Time' }])
        .execute();
    await getRepository(Category)
        .createQueryBuilder()
        .insert()
        .values([{ name: 'IT' }, { name: 'Salud' }])
        .execute();
}
async function populate() {
    await createConnection();
    await getRepository(User)
        .createQueryBuilder()
        .insert()
        .values([
            {
                name: `${faker.company.companyName()}`,
                email: `${faker.internet.email()}`,
                password: `${faker.internet.password()}`,
                roleId: 1,
                url: `${faker.image.imageUrl()}`,
            },
            {
                name: `${faker.name.findName()}`,
                email: `${faker.internet.email()}`,
                password: `${faker.internet.password()}`,
                roleId: 2,
                url: `${faker.image.imageUrl()}`,
            },
            {
                name: `${faker.name.findName()}`,
                email: `${faker.internet.email()}`,
                password: `${faker.internet.password()}`,
                roleId: 3,
                url: `${faker.image.imageUrl()}`,
            },
        ])
        .execute();
    await getRepository(Job)
        .createQueryBuilder()
        .insert()
        .values([
            {
                posicion: `${faker.lorem.sentence()}`,
                categoryId: 1,
                address: `${faker.address.streetAddress()}`,
                cityId: 1,
                userId: 2,
                typeId: 1,
                description: `${faker.lorem.paragraphs(3)}`,
                url_logo: `${faker.image.imageUrl()}`,
            },
        ])
        .execute();
    console.log('Hecho');
    process.exit(1);
}
populate();
