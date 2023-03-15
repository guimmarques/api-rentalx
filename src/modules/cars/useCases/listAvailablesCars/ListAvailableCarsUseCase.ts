import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  category_id?: string;
  name?: string;
  brand?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}
  async execute(params: IRequest): Promise<Car[]> {
    const { category_id, name, brand } = params;
    const cars = await this.carsRepository.findAvailable(
      brand,
      category_id,
      name,
    );
    return cars;
  }
}

export { ListAvailableCarsUseCase };
