export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'open' | 'in-progress' | 'closed';
export type SortingType = 'CREATION' | 'UPDATE';
export type SortingOrder = 'ASC' | 'DESC';

export interface TaskLabel {
  id: string;
  name: string;
  color: string;
}

export interface TaskComment {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  labels: TaskLabel[];
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  assignee: string;
  comments: TaskComment[];
}

export interface PageDetails {
  pageSize: number;
  offset: number;
  sortingType: SortingType;
  sortingOrder: SortingOrder;
}

export interface TasksResponse {
  tasks: Task[];
  pageDetails: {
    pageSize: number;
    hasNext: boolean;
  };
}

export interface CommentCursor {
  lastCommentId: string | null;
  pageSize: number;
}

export interface CommentsResponse {
  comments: TaskComment[];
  cursor: {
    lastMessageId: string | null;
    pageSize: number;
    hasNextMessage: boolean;
  };
}