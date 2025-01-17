import { DeleteCommentApplication } from './applications/delete.comment.application';
import { CreateCommentApplication } from './applications/create.comment.application';
import { UpdateCommentApplication } from './applications/update.comment.application';
import { TYPES } from './interfaces/types';
import { CommentRepository } from './repositories/comment.repository';
import CreateCommentService from './services/create.comment.service';
import DeleteCommentService from './services/delete.comment.service';
import UpdateCommentService from './services/update.comment.service';

export const createCommentService = {
	provide: TYPES.services.CreateCommentService,
	useClass: CreateCommentService
};

export const updateCommentService = {
	provide: TYPES.services.UpdateCommentService,
	useClass: UpdateCommentService
};

export const deleteCommentService = {
	provide: TYPES.services.DeleteCommentService,
	useClass: DeleteCommentService
};

export const createCommentApplication = {
	provide: TYPES.applications.CreateCommentApplication,
	useClass: CreateCommentApplication
};

export const updateCommentApplication = {
	provide: TYPES.applications.UpdateCommentApplication,
	useClass: UpdateCommentApplication
};

export const deleteCommentApplication = {
	provide: TYPES.applications.DeleteCommentApplication,
	useClass: DeleteCommentApplication
};

export const commentRepository = {
	provide: TYPES.repositories.CommentRepository,
	useClass: CommentRepository
};
