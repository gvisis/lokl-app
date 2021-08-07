import * as faker from 'faker';

const data = {
  produce: [
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Cakes & Cupcakes',
      image:
        'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d73',
      title: 'Vegetables',
      image:
        'https://images.unsplash.com/photo-1598030304671-5aa1d6f21128?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d74',
      title: 'Meat',
      image:
        'https://images.unsplash.com/photo-1448907503123-67254d59ca4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d75',
      title: 'Dairy',
      image:
        'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h800&w=600',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29gs75',
      title: 'Craft drinks',
      image: 'https://i.imgur.com/vgJY0z3.jpg',
    },
  ],
  companies: [
    {
      id: faker.datatype.uuid(),
      title: faker.company.companyName(),
      image: faker.random.image(),
      description: 'We make the best cupcakes in the world!',
      website: 'http://cakefactory.com',
      address: {
        street: faker.address.streetName(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
      },
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
    },
    {
      id: faker.datatype.uuid(),
      title: faker.company.companyName(),
      image: faker.random.image(),
      description: 'We make the best bread in the world!',
      website: 'http://bread.com',
      address: {
        street: faker.address.streetName(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
      },
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
    },
    {
      id: faker.datatype.uuid(),
      title: faker.company.companyName(),
      image: faker.random.image(),
      description: 'We make the best bread in the world!',
      website: 'http://breadfactory.com',
      address: {
        street: faker.address.streetName(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
      },
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
    },
    {
      id: faker.datatype.uuid(),
      title: faker.company.companyName(),
      image: faker.random.image(),
      description: 'We make the best Meaet in the world!',
      website: 'http://meatfactory.com',
      address: {
        street: faker.address.streetName(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
      },
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
    },
    {
      id: faker.datatype.uuid(),
      title: faker.company.companyName(),
      image: faker.random.image(),
      description: 'We make the best Meaet in the world!',
      website: 'http://meatfactory.com',
      address: {
        street: faker.address.streetName(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
      },
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
    },
    {
      id: faker.datatype.uuid(),
      title: faker.company.companyName(),
      image: faker.random.image(),
      description: 'We make the best Meaet in the world!',
      website: 'http://meatfactory.com',
      address: {
        street: faker.address.streetName(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
      },
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
    },
    {
      id: faker.datatype.uuid(),
      title: faker.company.companyName(),
      image: faker.random.image(),
      description: 'We make the best Meaet in the world!',
      website: 'http://meatfactory.com',
      address: {
        street: faker.address.streetName(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
      },
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
    },
  ],
  popular: [
    {
      id: faker.datatype.uuid(),
      title: faker.commerce.product(),
      image: faker.random.image('unsplash'),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
    },
    {
      id: faker.datatype.uuid(),
      title: faker.commerce.product(),
      image: faker.random.image('unsplash'),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
    },
    {
      id: faker.datatype.uuid(),
      title: faker.commerce.product(),
      image: faker.random.image('unsplash'),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
    },
    {
      id: faker.datatype.uuid(),
      title: faker.commerce.product(),
      image: faker.random.image('unsplash'),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
    },
    {
      id: faker.datatype.uuid(),
      title: faker.commerce.product(),
      image: faker.random.image('unsplash'),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
    },
    {
      id: faker.datatype.uuid(),
      title: faker.commerce.product(),
      image: faker.random.image('unsplash'),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
    },
    {
      id: faker.datatype.uuid(),
      title: faker.commerce.product(),
      image: faker.random.image('unsplash'),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
    },
    {
      id: faker.datatype.uuid(),
      title: faker.commerce.product(),
      image: faker.random.image('unsplash'),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
    },
    {
      id: faker.datatype.uuid(),
      title: faker.commerce.product(),
      image: faker.random.image('unsplash'),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
    },
  ],
  ads: [
    {
      id: faker.datatype.uuid(),
      title: faker.commerce.product(),
      image: faker.random.image('unsplash'),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      date: faker.date.past(),
      author: {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        city: faker.address.city(),
      },
    },
    {
      id: faker.datatype.uuid(),
      title: faker.commerce.product(),
      image: faker.random.image('unsplash'),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      date: faker.date.past(),
      author: {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        city: faker.address.city(),
      },
    },
    {
      id: faker.datatype.uuid(),
      title: faker.commerce.product(),
      image: faker.random.image('unsplash'),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      date: faker.date.past(),
      author: {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        city: faker.address.city(),
      },
    },
    {
      id: faker.datatype.uuid(),
      title: faker.commerce.product(),
      image: faker.random.image('unsplash'),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      date: faker.date.past(),
      author: {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        city: faker.address.city(),
      },
    },
    {
      id: faker.datatype.uuid(),
      title: faker.commerce.product(),
      image: faker.random.image('unsplash'),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      date: faker.date.past(),
      author: {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        city: faker.address.city(),
      },
    },
  ],
};
export default data;