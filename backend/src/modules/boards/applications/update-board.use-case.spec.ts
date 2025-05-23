import { Test, TestingModule } from '@nestjs/testing';
import { BoardRepositoryInterface } from '../repositories/board.repository.interface';
import { CommunicationServiceInterface } from 'src/modules/communication/interfaces/slack-communication.service.interface';
import { BoardFactory } from 'src/libs/test-utils/mocks/factories/board-factory.mock';
import { UpdateBoardDtoFactory } from 'src/libs/test-utils/mocks/factories/dto/updateBoardDto-factory.mock';
import { BoardUserFactory } from 'src/libs/test-utils/mocks/factories/boardUser-factory.mock';
import { NotFoundException } from '@nestjs/common';
import { UpdateBoardUserServiceInterface } from 'src/modules/boardUsers/interfaces/services/update.board.user.service.interface';
import { GetBoardUserServiceInterface } from 'src/modules/boardUsers/interfaces/services/get.board.user.service.interface';
import ColumnDto from 'src/modules/columns/dto/column.dto';
import { faker } from '@faker-js/faker';
import { BoardRoles } from 'src/libs/enum/board.roles';
import { BoardUserDtoFactory } from 'src/libs/test-utils/mocks/factories/dto/boardUserDto-factory.mock';
import { UserFactory } from 'src/libs/test-utils/mocks/factories/user-factory';
import User from 'src/modules/users/entities/user.schema';
import { generateNewSubColumns } from '../utils/generate-subcolumns';
import { mergeCardsFromSubBoardColumnsIntoMainBoard } from '../utils/merge-cards-from-subboard';
import { UpdateFailedException } from 'src/libs/exceptions/updateFailedBadRequestException';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import DeleteVoteService from 'src/modules/votes/services/delete.vote.service';
import { DeleteVoteServiceInterface } from 'src/modules/votes/interfaces/services/delete.vote.service.interface';
import Board from '../entities/board.schema';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { UseCase } from 'src/libs/interfaces/use-case.interface';
import { UpdateBoardUseCase } from './update-board.use-case';
import { BOARD_REPOSITORY } from 'src/modules/boards/constants';
import {
	GET_BOARD_USER_SERVICE,
	UPDATE_BOARD_USER_SERVICE
} from 'src/modules/boardUsers/constants';
import { DELETE_VOTE_SERVICE } from 'src/modules/votes/constants';
import { SLACK_COMMUNICATION_SERVICE } from 'src/modules/communication/constants';

const regularBoard = BoardFactory.create({ isSubBoard: false, dividedBoards: [] });
const userId = faker.string.uuid();
const updateBoardDto = UpdateBoardDtoFactory.create({ maxVotes: null });
const subBoards = BoardFactory.createMany(2, [
	{ isSubBoard: true, boardNumber: 1, submitedByUser: userId, submitedAt: new Date() },
	{ isSubBoard: true, boardNumber: 2 }
]);
const splitBoard: Board = BoardFactory.create({ isSubBoard: false, dividedBoards: subBoards });
const splitBoardWithSlack: Board = BoardFactory.create({
	isSubBoard: false,
	slackEnable: true,
	slackChannelId: faker.string.uuid(),
	dividedBoards: subBoards
});
const currentResponsible = BoardUserFactory.create({
	role: BoardRoles.RESPONSIBLE,
	board: splitBoardWithSlack._id
});
const boardUsersDto = BoardUserDtoFactory.createMany(3, [
	{ board: splitBoardWithSlack._id, role: BoardRoles.RESPONSIBLE },
	{
		board: splitBoardWithSlack._id,
		role: BoardRoles.MEMBER,
		user: currentResponsible.user as User,
		_id: String(currentResponsible._id)
	},
	{ board: splitBoardWithSlack._id, role: BoardRoles.MEMBER }
]);
const newResponsible = BoardUserFactory.create({
	board: splitBoardWithSlack._id,
	role: BoardRoles.RESPONSIBLE,
	user: UserFactory.create({ _id: (boardUsersDto[0].user as User)._id }),
	_id: String(boardUsersDto[0]._id)
});
const updateBoardDtoWithResponsible = UpdateBoardDtoFactory.create({
	responsible: newResponsible,
	mainBoardId: splitBoard._id,
	users: boardUsersDto,
	maxVotes: null,
	_id: splitBoardWithSlack._id,
	isSubBoard: true
});
const subBoardUpdated = { ...subBoards[1], submitedByUser: userId, submitedAt: new Date() };
const newSubColumnsSubBoardNumberOne = generateNewSubColumns(subBoards[0]);
const newSubColumnsSubBoardNumberTwo = generateNewSubColumns(subBoardUpdated);
const mergeSubBoard = {
	...splitBoardWithSlack,
	columns: mergeCardsFromSubBoardColumnsIntoMainBoard(
		[...splitBoardWithSlack.columns],
		newSubColumnsSubBoardNumberOne
	)
};

const boardResult = {
	...mergeSubBoard,
	columns: mergeCardsFromSubBoardColumnsIntoMainBoard(
		[...splitBoardWithSlack.columns],
		newSubColumnsSubBoardNumberTwo
	),
	dividedBoards: [subBoards[0], subBoardUpdated]
};

describe('UpdateBoardUseCase', () => {
	let useCase: UseCase<UpdateBoardDto, Board>;
	let updateBoardUserServiceMock: DeepMocked<UpdateBoardUserServiceInterface>;
	let boardRepositoryMock: DeepMocked<BoardRepositoryInterface>;
	let getBoardUserServiceMock: DeepMocked<GetBoardUserServiceInterface>;
	let slackCommunicationServiceMock: DeepMocked<CommunicationServiceInterface>;
	let deleteVoteServiceMock: DeepMocked<DeleteVoteService>;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UpdateBoardUseCase,
				{
					provide: SLACK_COMMUNICATION_SERVICE,
					useValue: createMock<CommunicationServiceInterface>()
				},
				{
					provide: DELETE_VOTE_SERVICE,
					useValue: createMock<DeleteVoteServiceInterface>()
				},
				{
					provide: GET_BOARD_USER_SERVICE,
					useValue: createMock<GetBoardUserServiceInterface>()
				},
				{
					provide: UPDATE_BOARD_USER_SERVICE,
					useValue: createMock<UpdateBoardUserServiceInterface>()
				},
				{
					provide: BOARD_REPOSITORY,
					useValue: createMock<BoardRepositoryInterface>()
				}
			]
		}).compile();

		useCase = module.get(UpdateBoardUseCase);
		boardRepositoryMock = module.get(BOARD_REPOSITORY);
		updateBoardUserServiceMock = module.get(UPDATE_BOARD_USER_SERVICE);
		getBoardUserServiceMock = module.get(GET_BOARD_USER_SERVICE);
		deleteVoteServiceMock = module.get(DELETE_VOTE_SERVICE);
		slackCommunicationServiceMock = module.get(SLACK_COMMUNICATION_SERVICE);
	});

	beforeEach(() => {
		jest.restoreAllMocks();
		jest.clearAllMocks();

		boardRepositoryMock.getBoard.mockResolvedValue(subBoards[1]);
		boardRepositoryMock.getBoardByQuery.mockResolvedValue(splitBoardWithSlack);
		boardRepositoryMock.updateMergedSubBoard.mockResolvedValue(subBoardUpdated);
		boardRepositoryMock.updateMergedBoard.mockResolvedValue(boardResult);
	});

	it('should be defined', () => {
		expect(useCase).toBeDefined();
	});

	describe('execute', () => {
		it('should throw an error if max votes is less than the highest votes on board', async () => {
			const updateBoardDtoWithMaxVotes: UpdateBoardDto = { ...updateBoardDto, maxVotes: 2 };
			const boardUsers = BoardUserFactory.createMany(2, [{ votesCount: 3 }, { votesCount: 1 }]);

			getBoardUserServiceMock.getVotesCount.mockResolvedValue(boardUsers);

			expect(async () => await useCase.execute(updateBoardDtoWithMaxVotes)).rejects.toThrow(
				UpdateFailedException
			);
		});

		it('should throw an error if board not found', async () => {
			boardRepositoryMock.getBoard.mockResolvedValue(null);
			expect(async () => await useCase.execute(updateBoardDto)).rejects.toThrow(NotFoundException);
		});

		it('should call the changeResponsibleOnBoard method if the current responsible is not equal to the new responsible', async () => {
			const updateBoardDtoWithSubBoardId: UpdateBoardDto = {
				...updateBoardDtoWithResponsible,
				boardId: subBoards[1]._id
			};
			//gets the current responsible from the board
			getBoardUserServiceMock.getBoardResponsible.mockResolvedValue(currentResponsible);

			await useCase.execute(updateBoardDtoWithSubBoardId);
			//update the changeResponsibleOnBoard
			expect(updateBoardUserServiceMock.updateBoardUserRole).toBeCalled();
		});

		it('should throw an error when update fails', async () => {
			boardRepositoryMock.updateBoard.mockResolvedValue(null);

			expect(async () => await useCase.execute(updateBoardDto)).rejects.toThrow(
				UpdateFailedException
			);
		});

		it('should call the slackCommunicationService.executeResponsibleChange if the board has a newResponsible and slack enable', async () => {
			const boardWithSlack: Board = {
				...subBoards[1],
				slackEnable: true,
				slackChannelId: faker.string.uuid()
			};

			const updateBoardDtoWithBoardWithSlack: UpdateBoardDto = {
				...updateBoardDtoWithResponsible,
				boardId: boardWithSlack._id
			};

			boardRepositoryMock.getBoard.mockResolvedValue(boardWithSlack);
			getBoardUserServiceMock.getBoardResponsible.mockResolvedValue(currentResponsible);
			boardRepositoryMock.updateBoard.mockResolvedValue(boardWithSlack);

			await useCase.execute(updateBoardDtoWithBoardWithSlack);

			expect(slackCommunicationServiceMock.executeResponsibleChange).toBeCalledTimes(1);
		});

		it('should update a split board', async () => {
			const boardWithAddedCards: Board = { ...subBoards[1], addCards: false };

			const updateBoardDtoWithBoardWithAddedCards = UpdateBoardDtoFactory.create({
				maxVotes: null,
				title: 'Mock 2.0',
				_id: boardWithAddedCards._id,
				addCards: true,
				boardId: boardWithAddedCards._id
			});
			const boardResult = {
				...boardWithAddedCards,
				title: updateBoardDtoWithBoardWithAddedCards.title
			};

			boardRepositoryMock.getBoard.mockResolvedValue(boardWithAddedCards);
			boardRepositoryMock.updateBoard.mockResolvedValue(boardResult);

			const result = await useCase.execute(updateBoardDtoWithBoardWithAddedCards);

			expect(result).toEqual(boardResult);
		});

		it('should update a regular board', async () => {
			const updateRegularBoard: Board = {
				...regularBoard,
				columns: [...regularBoard.columns, { ...regularBoard.columns[1], _id: null }]
			};

			updateRegularBoard.columns[1].title = 'Make things';
			updateRegularBoard.columns[1].color = '#FEB9A9';

			const updateRegularBoardDto = UpdateBoardDtoFactory.create({
				maxVotes: null,
				_id: updateRegularBoard._id,
				isSubBoard: false,
				dividedBoards: [],
				columns: updateRegularBoard.columns as ColumnDto[],
				deletedColumns: [updateRegularBoard.columns[0]._id],
				boardId: updateRegularBoard._id
			});

			boardRepositoryMock.getBoard.mockResolvedValue(updateRegularBoard);
			getBoardUserServiceMock.getBoardResponsible.mockResolvedValue(null);
			deleteVoteServiceMock.deleteCardVotesFromColumn.mockResolvedValue(null);

			const boardResult = { ...updateRegularBoard, columns: updateRegularBoard.columns.slice(1) };

			boardRepositoryMock.updateBoard.mockResolvedValue(boardResult);

			const result = await useCase.execute(updateRegularBoardDto);

			expect(result).toEqual(boardResult);
		});
	});
});
