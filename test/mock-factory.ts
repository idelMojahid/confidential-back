
// @ts-ignore
export const repositoryMockFactory: () => any = jest.fn(() => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    bulkCreate: jest.fn(),
   }));
