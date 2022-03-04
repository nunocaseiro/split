import { LeanDocument } from 'mongoose';
import { QueryUserDocument } from '../../../../libs/interfaces/query/query.user.interface';
import { UserDocument } from '../../schemas/user.schema';

export interface GetUserService {
  getByEmail(email: string): QueryUserDocument;
  getById(id: string): QueryUserDocument;
  getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: string,
  ): Promise<LeanDocument<UserDocument> | false>;
}
