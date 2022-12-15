import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoGenericRepository } from 'src/libs/repositories/mongo/mongo-generic.repository';
import Team, { TeamDocument } from '../entities/teams.schema';
import { TeamRepositoryInterface } from './team.repository.interface';

@Injectable()
export class TeamRepository
	extends MongoGenericRepository<Team>
	implements TeamRepositoryInterface
{
	constructor(@InjectModel(Team.name) private model: Model<TeamDocument>) {
		super(model);
	}

	getTeam(teamId: string): Promise<Team> {
		return this.findOneById(
			teamId,
			{ _id: 1, name: 1 },
			{
				path: 'users',
				select: 'user role isNewJoiner',
				populate: {
					path: 'user',
					select: '_id firstName lastName email joinedAt'
				}
			}
		);
	}

	getTeamsWithUsers(teamIds: string[]): Promise<Team[]> {
		return this.findAllWithQuery({ _id: { $in: teamIds } }, { _id: 1, name: 1 }, [
			{
				path: 'users',
				select: 'user role',
				populate: {
					path: 'user',
					select: '_id firstName lastName email joinedAt'
				}
			},
			{
				path: 'boards',
				select: '_id'
			}
		]);
	}

	getAllTeams(): Promise<Team[]> {
		return this.findAllWithQuery(null, null, {
			path: 'users',
			select: 'user role email',
			populate: {
				path: 'user',
				select: '_id firstName lastName email joinedAt'
			}
		});
	}
}