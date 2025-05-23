import CreateGuestUserDto from '../../dto/create.guest.user.dto';
import CreateUserAzureDto from '../../dto/create.user.azure.dto';
import CreateUserDto from '../../dto/create.user.dto';
import User from '../../entities/user.schema';

export interface CreateUserServiceInterface {
	create(user: CreateUserDto | CreateUserAzureDto): Promise<User>;
	createMany(usersData: Array<CreateUserDto | CreateUserAzureDto>): Promise<Array<User>>;
	createGuest(guestUserData: CreateGuestUserDto): Promise<User>;
}
