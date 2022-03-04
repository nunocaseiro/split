import { LeanDocument } from 'mongoose';
import { Tokens } from '../../../libs/interfaces/jwt/tokens.interface';
import UserDto from '../../users/dto/user.dto';
import { UserDocument } from '../../users/schemas/user.schema';
import { GetTokenAuthApplication } from '../interfaces/applications/get-token.auth.application.interface';
import { GetTokenAuthService } from '../interfaces/services/get-token.auth.service.interface';

const response = (
  jwt: Tokens,
  user: LeanDocument<UserDocument> | UserDto,
  strategy: string,
) => {
  return {
    ...jwt,
    email: user.email,
    name: user.name,
    strategy,
    id: user._id,
  };
};

export const signIn = async (
  user: LeanDocument<UserDocument> | UserDto,
  getTokenService: GetTokenAuthService | GetTokenAuthApplication,
  strategy: string,
) => {
  const jwt = await getTokenService.getTokens(user._id);
  if (jwt) {
    return response(jwt, user, strategy);
  }
  return null;
};
