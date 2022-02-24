import { forwardRef, Module } from '@nestjs/common';
import { mongooseModule } from '../../infrastructure/database/mongoose.module';
import SocketModule from '../socket/socket.module';
import {
  createCommentApplication,
  createCommentService,
  deleteCommentApplication,
  deleteCommentService,
  updateCommentApplication,
  updateCommentService,
} from './comment.providers';
import CommentsController from './controller/comments.controller';

@Module({
  imports: [mongooseModule, forwardRef(() => SocketModule)],
  controllers: [CommentsController],
  providers: [
    createCommentApplication,
    createCommentService,
    updateCommentService,
    updateCommentApplication,
    deleteCommentApplication,
    deleteCommentService,
  ],
  exports: [],
})
export class CommentsModule {}