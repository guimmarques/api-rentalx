import { container } from 'tsyringe';
import { IMailProvider } from './IMailProvider';
import { EtherialMailProvider } from './Implementations/EtherealMailProvider';
import { SESMailProvider } from './Implementations/SESMailProvider';

const mailProvider = {
  local: container.resolve(EtherialMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER],
);
