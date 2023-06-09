import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateRentalUseCase } from './CreateRentalUseCase';

class CreateRentalController {
  async handle(request: Request, response: Response) {
    const { expected_return_date, car_id } = request.body;
    const { id } = request.user;
    const createRentaUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentaUseCase.execute({
      car_id,
      expected_return_date,
      user_id: id,
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };
