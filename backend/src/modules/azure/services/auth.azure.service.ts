import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import jwt_decode from 'jwt-decode';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserService } from '../../users/interfaces/services/create.user.service.interface';
import { GetUserService } from '../../users/interfaces/services/get.user.service.interface';
import * as UserType from '../../users/interfaces/types';
import * as AuthType from '../../auth/interfaces/types';
import { GetTokenAuthService } from '../../auth/interfaces/services/get-token.auth.service.interface';
import { AuthAzureService } from '../interfaces/services/auth.azure.service.interface';
import { signIn } from '../../auth/shared/login.auth';
import { TYPES } from '../interfaces/types';
import { CronAzureService } from '../interfaces/services/cron.azure.service.interface';

@Injectable()
export default class AuthAzureServiceImpl implements AuthAzureService {
  constructor(
    @Inject(UserType.TYPES.services.CreateUserService)
    private readonly createUserService: CreateUserService,
    @Inject(UserType.TYPES.services.GetUserService)
    private readonly getUserService: GetUserService,
    @Inject(AuthType.TYPES.services.GetTokenAuthService)
    private readonly getTokenService: GetTokenAuthService,
    @Inject(TYPES.services.CronAzureService)
    private readonly cronAzureService: CronAzureService,
    private readonly configService: ConfigService,
  ) {}

  async loginOrRegisterAzureToken(azureToken: string) {
    const decoded: { unique_name: string; email: string; name: string } =
      jwt_decode(azureToken);
    const user = await this.getUserService.getByEmail(
      decoded.email ?? decoded.unique_name,
    );
    if (user) {
      return signIn(user, this.getTokenService, 'azure');
    }
    const createdUser = await this.createUserService.create({
      email: decoded?.email === undefined ? decoded.unique_name : decoded.email,
      name: decoded?.name ?? 'undefined',
      password: '',
    });
    if (createdUser) {
      return signIn(createdUser, this.getTokenService, 'azure');
    }
    return null;
  }

  async checkUserExistsInActiveDirectory(email: string) {
    const { data } = await axios.get(
      `https://graph.microsoft.com/v1.0/users?$search="mail:${email}" OR "displayName:${email}" OR "userPrincipalName:${email}"&$orderbydisplayName&$count=true`,
      {
        headers: {
          Authorization: `Bearer ${this.cronAzureService.getToken()}`,
          ConsistencyLevel: 'eventual',
        },
      },
    );

    try {
      const count = data['@odata.count'];
      for (let i = 0; i < count; i += 1) {
        const user = data.value[i];
        if (user.mail && user.mail.toLowerCase() === email.toLowerCase()) {
          return true;
        }
        if (
          user.displayName &&
          user.displayName.toLowerCase() === email.toLowerCase()
        ) {
          return true;
        }
        if (
          user.userPrincipalName &&
          user.userPrincipalName.toLowerCase() === email.toLowerCase()
        ) {
          return true;
        }
      }
    } catch (error) {
      return false;
    }

    return false;
  }
}
