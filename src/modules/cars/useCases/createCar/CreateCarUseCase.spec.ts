import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Civic',
      description: 'Carro lindo',
      daily_rate: 100,
      license_plate: 'ABC-12345',
      fine_amount: 60,
      brand: 'Honda',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car with exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'Civic',
      description: 'Carro lindo',
      daily_rate: 100,
      license_plate: 'ABC-12345',
      fine_amount: 60,
      brand: 'Honda',
      category_id: 'category',
    });

    await expect(
      createCarUseCase.execute({
        name: 'Civic',
        description: 'Carro lindo',
        daily_rate: 100,
        license_plate: 'ABC-12345',
        fine_amount: 60,
        brand: 'Honda',
        category_id: 'category',
      }),
    ).rejects.toEqual(new AppError('Car already exists!'));
  });

  it('should not be able to create a new car with available true by default license plate', async () => {
    const car = await createCarUseCase.execute({
      name: 'Civic',
      description: 'Carro lindo',
      daily_rate: 100,
      license_plate: 'ABC-12345',
      fine_amount: 60,
      brand: 'Honda',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
