const list = {
  cocktails: [
    {
      name: 'Rusty Nail',
      ingredients: [8, 6],
      amount: [
        {
          ingredientId: 8,
          value: '60ml',
        },
        {
          ingredientId: 6,
          value: '30ml',
        },
      ],
      id: 1,
    },
    {
      name: 'Martinez',
      ingredients: [2, 4, 5, 15],
      amount: [
        {
          ingredientId: 2,
          value: '37ml',
        },
        {
          ingredientId: 4,
          value: '37ml',
        },
        {
          ingredientId: 5,
          value: '7ml',
        },
        {
          ingredientId: 15,
          value: '2-5 dash',
        },
      ],
      id: 2,
    },
    {
      name: 'Jungle bird',
      ingredients: [3, 12, 7, 11, 13],
      amount: [
        {
          ingredientId: 3,
          value: '45ml',
        },
        {
          ingredientId: 12,
          value: '45ml',
        },
        {
          ingredientId: 7,
          value: '15ml',
        },
        {
          ingredientId: 11,
          value: '15ml',
        },
        {
          ingredientId: 13,
          value: '15ml',
        },
      ],
      id: 3,
    },
    {
      name: 'Royal Hawaiian',
      ingredients: [1, 12, 14, 10, 5],
      amount: [
        {
          ingredientId: 1,
          value: '45ml',
        },
        {
          ingredientId: 12,
          value: '20ml',
        },
        {
          ingredientId: 14,
          value: '10ml',
        },
        {
          ingredientId: 10,
          value: '10ml',
        },
        {
          ingredientId: 5,
          value: '10ml',
        },
      ],
      id: 4,
    },
    {
      name: 'Lucien Gaudin',
      ingredients: [1, 4, 9, 7],
      amount: [
        {
          ingredientId: 1,
          value: '30-40ml',
        },
        {
          ingredientId: 4,
          value: '15ml',
        },
        {
          ingredientId: 9,
          value: '15ml',
        },
        {
          ingredientId: 7,
          value: '15ml',
        },
      ],
      id: 5,
    },
  ],
  ingredients: [
    {
      id: 1,
      name: 'gin london dry',
    },
    {
      id: 2,
      name: 'gin old tom',
    },
    {
      id: 3,
      name: 'dark rum',
    },
    {
      id: 4,
      name: 'sweet vermouth',
    },
    {
      id: 5,
      name: 'maraschino',
    },
    {
      id: 6,
      name: 'drambuie',
    },
    {
      id: 7,
      name: 'campari',
    },
    {
      id: 8,
      name: 'blended scotch',
    },
    {
      id: 9,
      name: 'cointreau',
    },
    {
      id: 10,
      name: 'lemon juice',
    },
    {
      id: 11,
      name: 'lime juice',
    },
    {
      id: 12,
      name: 'pineapple juice',
    },
    {
      id: 13,
      name: 'demera syrup',
    },
    {
      id: 14,
      name: 'orgeat',
    },
    {
      id: 15,
      name: 'orange bitters',
    },
  ],
  categories: {
    spirits: [1, 2, 3, 4, 8],
    liqueurs: [5, 6, 7, 9, 15],
    other: [10, 11, 12, 13, 14],
  },
}

export default list
