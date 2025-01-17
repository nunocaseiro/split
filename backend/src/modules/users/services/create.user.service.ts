import { Inject, Injectable } from '@nestjs/common';
import CreateUserDto from '../dto/create.user.dto';
import User from '../entities/user.schema';
import { TYPES } from '../interfaces/types';
import { UserRepositoryInterface } from '../repository/user.repository.interface';
import CreateGuestUserDto from '../dto/create.guest.user.dto';
import faker from '@faker-js/faker';
import { CreateUserServiceInterface } from '../interfaces/services/create.user.service.interface';

@Injectable()
export default class CreateUserService implements CreateUserServiceInterface {
	constructor(
		@Inject(TYPES.repository)
		private readonly userRepository: UserRepositoryInterface
	) {}

	create(userData: CreateUserDto) {
		const user: User = {
			...userData,
			strategy: '',
			isSAdmin: false,
			isDeleted: false,
			joinedAt: new Date(),
			isAnonymous: false
		};

		return this.userRepository.create(user);
	}

	createGuest(guestUserData: CreateGuestUserDto) {
		const { firstName, lastName } = guestUserData;

		const email = faker.internet.email(firstName, lastName, '', { allowSpecialCharacters: true });
		const user: User = {
			firstName,
			lastName: lastName ?? '',
			password: '',
			email: email,
			strategy: '',
			isSAdmin: false,
			isDeleted: false,
			joinedAt: new Date(),
			isAnonymous: true,
			updatedAt: new Date()
		};

		return this.userRepository.create(user);
	}
}
