import { Inject, Injectable } from '@nestjs/common';
import { RegisterOrLoginAzureUseCaseInterface } from '../interfaces/applications/register-or-login.azure.use-case.interface';
import { AuthAzureServiceInterface } from '../interfaces/services/auth.azure.service.interface';
import { TYPES } from '../interfaces/types';
import { AzureDecodedUser } from '../services/auth.azure.service';
import jwt_decode from 'jwt-decode';
import * as UserType from 'src/modules/users/interfaces/types';
import { GetUserServiceInterface } from 'src/modules/users/interfaces/services/get.user.service.interface';
import { CreateUserServiceInterface } from 'src/modules/users/interfaces/services/create.user.service.interface';
import User from 'src/modules/users/entities/user.schema';
import * as AuthType from 'src/modules/auth/interfaces/types';
import * as StorageType from 'src/modules/storage/interfaces/types';
import { UpdateUserServiceInterface } from 'src/modules/users/interfaces/services/update.user.service.interface';
import { GetTokenAuthServiceInterface } from 'src/modules/auth/interfaces/services/get-token.auth.service.interface';
import { signIn } from 'src/modules/auth/shared/login.auth';
import { createHash } from 'node:crypto';
import { StorageServiceInterface } from 'src/modules/storage/interfaces/services/storage.service';

@Injectable()
export class RegisterOrLoginAzureUseCase implements RegisterOrLoginAzureUseCaseInterface {
	constructor(
		@Inject(TYPES.services.AuthAzureService)
		private authAzureService: AuthAzureServiceInterface,
		@Inject(UserType.TYPES.services.GetUserService)
		private readonly getUserService: GetUserServiceInterface,
		@Inject(UserType.TYPES.services.CreateUserService)
		private readonly createUserService: CreateUserServiceInterface,
		@Inject(AuthType.TYPES.services.UpdateUserService)
		private readonly updateUserService: UpdateUserServiceInterface,
		@Inject(AuthType.TYPES.services.GetTokenAuthService)
		private readonly getTokenService: GetTokenAuthServiceInterface,
		@Inject(StorageType.TYPES.services.StorageService)
		private readonly storageService: StorageServiceInterface
	) {}

	async execute(azureToken: string) {
		const { unique_name, email, name, given_name, family_name } = <AzureDecodedUser>(
			jwt_decode(azureToken)
		);

		const emailOrUniqueName = email ?? unique_name;

		const userFromAzure = await this.authAzureService.getUserFromAzure(emailOrUniqueName);

		if (!userFromAzure) return null;

		const user = await this.getUserService.getByEmail(emailOrUniqueName);

		let userToAuthenticate: User;

		if (user) {
			userToAuthenticate = user;
		} else {
			const splitedName = name ? name.split(' ') : [];
			const firstName = given_name ?? splitedName[0] ?? 'first';
			const lastName = family_name ?? splitedName.at(-1) ?? 'last';

			const createdUser = await this.createUserService.create({
				email: emailOrUniqueName,
				firstName,
				lastName,
				providerAccountCreatedAt: userFromAzure.createdDateTime
			});

			if (!createdUser) return null;

			userToAuthenticate = createdUser;
		}

		const avatarUrl = await this.getUserPhoto(userToAuthenticate);

		if (avatarUrl) {
			await this.updateUserService.updateUserAvatar(userToAuthenticate._id, avatarUrl);

			userToAuthenticate.avatar = avatarUrl;
		}

		return signIn(userToAuthenticate, this.getTokenService, 'azure');
	}

	private async getUserPhoto(user: User) {
		const { email, avatar } = user;
		const azureUser = await this.authAzureService.getUserFromAzure(email);

		if (!azureUser) return '';

		try {
			const blob = await this.authAzureService.fetchUserPhoto(azureUser.id);

			const buffer = Buffer.from(await blob.arrayBuffer());
			const hash = createHash('md5').update(buffer).digest('hex');

			if (avatar) {
				const avatarHash = avatar.split('/').pop().split('.').shift();

				if (avatarHash === hash) return;

				await this.storageService.deleteFile(avatar);
			}

			return this.storageService.uploadFile(hash, {
				buffer,
				mimetype: blob.type,
				originalname: `${hash}.${blob.type.split('/').pop()}`
			});
		} catch (ex) {
			return '';
		}
	}
}
