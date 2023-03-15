import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'C40',
      description: 'Carro Sedan TOP',
      daily_rate: 250,
      license_plate: 'ABC-987654',
      fine_amount: 100,
      brand: 'Volvo',
      category_id: '754f069d-78fc-45c0-a5db-be71105236af',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'XC60',
      description: 'Carro Sedan TOP',
      daily_rate: 250,
      license_plate: 'ABC-987654',
      fine_amount: 100,
      brand: 'Volvo',
      category_id: '754f069d-78fc-45c0-a5db-be71105236af',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'XC60',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'XC60',
      description: 'Carro Sedan TOP',
      daily_rate: 250,
      license_plate: 'ABC-987654',
      fine_amount: 100,
      brand: 'Volvo',
      category_id: '754f069d-78fc-45c0-a5db-be71105236af',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Volvo',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'XC60',
      description: 'Carro Sedan TOP',
      daily_rate: 250,
      license_plate: 'ABC-987654',
      fine_amount: 100,
      brand: 'Volvo',
      category_id: '754f069d-78fc-45c0-a5db-be71105236af',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: '754f069d-78fc-45c0-a5db-be71105236af',
    });

    expect(cars).toEqual([car]);
  });
});
