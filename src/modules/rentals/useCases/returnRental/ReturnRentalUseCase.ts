import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class ReturnRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(data: IRequest) {
    const { id, user_id } = data;

    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError('Rental does not exists!');
    }

    const car = await this.carsRepository.findById(rental.car_id);

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInHours(
      rental.start_date,
      this.dateProvider.dateNow(),
    );

    daily = Math.ceil(daily / 24);

    let delay = this.dateProvider.compareInHours(
      rental.expected_return_date,
      dateNow,
    );

    delay = Math.ceil(delay / 24);

    let total = 0;

    if (delay > 0) {
      const calculate_fine = Number(delay) * Number(car.fine_amount);
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    const returnRental = await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return returnRental;
  }
}
export { ReturnRentalUseCase };
