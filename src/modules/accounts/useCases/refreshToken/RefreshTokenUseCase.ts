import auth from '@config/auth';
import { UsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokenRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/Implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokenRepository')
    private usersTokenRepository: UsersTokenRepository,
    @inject('DateProvider')
    private dateProvider: DayjsDateProvider,
  ) {}

  async execute(refresh_token: string): Promise<ITokenResponse> {
    const {
      secret_refresh_token,
      secret_token,
      expires_in_token,
      expires_in_refresh_token,
      expires_in_refresh_token_days,
    } = auth;

    const { email, sub }: JwtPayload = verify(
      refresh_token,
      secret_refresh_token,
    ) as JwtPayload;

    const user_id = sub;

    const userToken =
      await this.usersTokenRepository.findByUserIdAndRefreshToken(
        user_id,
        refresh_token,
      );

    if (!userToken) {
      throw new AppError('Refresh Token Invalid!');
    }

    await this.usersTokenRepository.deleteById(userToken.id);

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_in_refresh_token_days,
    );
    const new_refresh_token = sign({ email }, secret_refresh_token, {
      subject: sub,
      expiresIn: expires_in_refresh_token,
    });

    await this.usersTokenRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token: new_refresh_token,
      user_id,
    });

    const new_token = sign({ email }, secret_token, {
      subject: sub,
      expiresIn: expires_in_token,
    });

    return { token: new_token, refresh_token: new_refresh_token };
  }
}

export { RefreshTokenUseCase };
