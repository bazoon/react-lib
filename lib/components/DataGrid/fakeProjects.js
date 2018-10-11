const faker = require('faker');


const count = 1270;
const items = [];


for (let i = 0; i < count; i++ ) {
    items.push({
        id: faker.random.uuid(),
        code: faker.finance.account(),
        name: faker.finance.accountName(),
        leader: faker.name.firstName(),
        price: faker.random.number(),
        startDate: faker.date.future(),
        one: faker.lorem.paragraph(),
        two: faker.lorem.paragraph(),
    });
}

export default items;