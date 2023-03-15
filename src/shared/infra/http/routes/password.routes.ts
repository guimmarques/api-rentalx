import { ResetPasswordController } from '@modules/accounts/useCases/resetPassword/ResetPasswordController';
import { ResetPasswordUseCase } from '@modules/accounts/useCases/resetPassword/ResetPasswordUseCase';
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { Router } from 'express';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordController.handle);

export { passwordRoutes };
