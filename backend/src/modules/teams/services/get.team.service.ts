import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { GetTeamServiceInterface } from '../interfaces/services/get.team.service.interface';
import Team from '../entities/team.schema';
import { TYPES } from '../interfaces/types';
import * as Boards from 'src/modules/boards/interfaces/types';
import * as TeamUsers from 'src/modules/teamUsers/interfaces/types';
import { TeamRepositoryInterface } from '../interfaces/repositories/team.repository.interface';
import User from 'src/modules/users/entities/user.schema';
import UserDto from 'src/modules/users/dto/user.dto';
import { GetBoardServiceInterface } from 'src/modules/boards/interfaces/services/get.board.service.interface';
import { GetTeamUserServiceInterface } from 'src/modules/teamUsers/interfaces/services/get.team.user.service.interface';

@Injectable()
export default class GetTeamService implements GetTeamServiceInterface {
	constructor(
		@Inject(TYPES.repositories.TeamRepository)
		private readonly teamRepository: TeamRepositoryInterface,
		@Inject(TeamUsers.TYPES.services.GetTeamUserService)
		private getTeamUserService: GetTeamUserServiceInterface,
		@Inject(Boards.TYPES.services.GetBoardService)
		private getBoardService: GetBoardServiceInterface
	) {}

	countAllTeams() {
		return this.teamRepository.countDocuments();
	}

	async getTeam(teamId: string) {
		const team = await this.teamRepository.getTeam(teamId);

		team.users.sort((a, b) => {
			const userA = a.user as User;
			const userB = b.user as User;

			const fullNameA = `${userA?.firstName.toLowerCase()} ${userA?.lastName.toLowerCase()}`;
			const fullNameB = `${userB?.firstName.toLowerCase()} ${userB?.lastName.toLowerCase()}`;

			return fullNameA < fullNameB ? -1 : 1;
		});

		return team;
	}

	async getTeamsOfUser(userId: string) {
		const teamsUser = await this.getTeamUserService.getAllTeamsOfUser(userId);

		const teams: Team[] = await this.teamRepository.getTeamsWithUsers(
			teamsUser.map((teamUser) => teamUser._id)
		);

		const allBoards = await this.getBoardService.getAllMainBoards();

		const teamsResult = teams.map((team) => {
			return {
				...team,
				boardsCount:
					allBoards.filter((board) => String(board.team) === String(team._id)).length ?? 0
			};
		});

		return teamsResult;
	}

	async getAllTeams(user: UserDto) {
		if (!user.isSAdmin) throw new ForbiddenException();

		const teams = await this.teamRepository.getAllTeams();

		const allBoards = await this.getBoardService.getAllMainBoards();

		return teams.map((team) => {
			return {
				...team,
				boardsCount:
					allBoards.filter((board) => String(board.team) === String(team._id)).length ?? 0
			};
		});
	}

	async getTeamsUserIsNotMember(userId: string) {
		const allTeams = await this.teamRepository.getAllTeams();
		const teamUsers = await this.getTeamUserService.getAllTeamsOfUser(userId);

		if (teamUsers.length === 0) return allTeams;

		const teamsWithUsers: Team[] = await this.teamRepository.getTeamsWithUsers(
			teamUsers.map((teamUser) => teamUser._id)
		);

		//ID's of the teams the user IS member
		const teamsIds = teamsWithUsers.map((team) => team._id.toString());

		const teamsUserIsNotMember = allTeams.flatMap((team) => {
			if (teamsIds.includes(team._id.toString())) return [];

			const { name, _id } = team;

			return { name, _id };
		});

		return teamsUserIsNotMember;
	}
}
