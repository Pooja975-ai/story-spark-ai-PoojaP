import ApiError from "../../../errors/api_error";
import { ITokenPayload } from "../../../interfaces/token";
import { User } from "../user/user.model";
import { IComment, ICommentPayload } from "./comment.interface";
import httpStatus from "http-status";
import { Comment } from "./comment.model";
import { Types } from "mongoose";
import { Post } from "../post/post.model";

const createComment = async (
  payload: ICommentPayload,
  token: ITokenPayload
) => {
  const { _id, email } = token;
  const user = _id ? await User.findById(_id) : await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found!");
  }
  const post = await Post.findOne({ _id: payload.postId });
  if (!post) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Post not found!");
  }
  post.commentsCount = post.commentsCount + 1;
  await post.save();
  const commentData: Omit<IComment, "parentCommentId"> = {
    postId: new Types.ObjectId(payload.postId),
    userId: user._id,
    comment: payload.comment,
  };
  if (payload.parentCommentId) {
    (commentData as IComment).parentCommentId = new Types.ObjectId(
      payload.parentCommentId
    );
  }
  const res = await Comment.create(commentData);
  return res;
};

const getCommentsByPostId = async (postId: string) => {
  const allComments = (await Comment.find({ postId })
    .populate("userId", "name email")
    .populate("likes")
    .sort({ createdAt: -1 })
    .lean()) as any[];

  const totalComments = allComments.length;

  const topLevelComments: any[] = [];
  const replyMap = new Map<string, any[]>();

  // Distribute comments into top-level list and replies map
  for (const comment of allComments) {
    if (!comment.parentCommentId) {
      comment.replies = [];
      topLevelComments.push(comment);
    } else {
      const parentIdStr = comment.parentCommentId.toString();
      if (!replyMap.has(parentIdStr)) {
        replyMap.set(parentIdStr, []);
      }
      replyMap.get(parentIdStr)!.push(comment);
    }
  }

  // Attach replies to their corresponding top-level comments and sort them chronologically (createdAt: 1)
  for (const comment of topLevelComments) {
    const idStr = comment._id.toString();
    const replies = replyMap.get(idStr) || [];
    // Sort replies in ascending chronological order
    replies.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    comment.replies = replies;
  }

  return { comments: topLevelComments, totalComments };
};

const toggleCommentLike = async (commentId: string, token: ITokenPayload) => {
  const { _id, email } = token;
  const user = _id ? await User.findById(_id) : await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found!");
  }
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Comment not found!");
  }
  
  const hasLiked = comment.likes?.includes(user._id);
  if (hasLiked) {
    comment.likes = comment.likes?.filter((id) => id.toString() !== user._id.toString());
  } else {
    comment.likes?.push(user._id);
  }
  await comment.save();
  return comment;
};

export const CommentService = {
  createComment,
  getCommentsByPostId,
  toggleCommentLike,
};
