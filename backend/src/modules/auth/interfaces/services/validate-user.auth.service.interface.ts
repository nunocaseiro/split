import { LeanDocument } from 'mongoose';
import { QueryUserDocument } from '../../../../libs/interfaces/query/query.user.interface';
import { UserDocument } from '../../../users/schemas/user.schema';

export interface ValidateUserAuthService {
  validateUserWithCredentials(
    email: string,
    plainTextPassword: string,
  ): Promise<LeanDocument<UserDocument> | null>;
  validateUserById(userId: string): QueryUserDocument;
  validateUserByRefreshToken(
    authorization: string,
    userId: string,
  ): Promise<LeanDocument<UserDocument> | false>;
}
