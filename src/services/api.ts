"use server";

import { PrismaClient } from "@prisma/client";
import { Task, TaskStatus, CommentCursor, TaskPriority } from "../types/task";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";

const prisma = new PrismaClient();

export async function fetchAllTasks() {
	const tasks: Task[] = await prisma.task.findMany({
		include: {
			labels: true,
			comments: true,
		},
	});

	return {
		tasks,
	};
}

export async function addTask(data: NewTaskData) {
	await prisma.task.create({
		data: {
			...data,
			status: "open",
			dueDate: new Date(),
			description: data.description || "",
		},
	});
}

export async function fetchCounts() {
	const counts = await prisma.task.groupBy({
		by: ["status"],
		_count: { id: true },
	});

	return {
		open:
			counts.find((c: { status: string }) => c.status === "open")?._count.id ??
			0,
		in_progress:
			counts.find((c: { status: string }) => c.status === "in_progress")?._count
				.id ?? 0,
		closed:
			counts.find((c: { status: string }) => c.status === "closed")?._count
				.id ?? 0,
	};
}

export async function fetchComments(taskId: string, cursor: CommentCursor) {
	const comments = await prisma.comment.findMany({
		where: { taskId },
		take: cursor.pageSize,
		skip: cursor.lastCommentId ? 1 : 0,
		cursor: cursor.lastCommentId ? { id: cursor.lastCommentId } : undefined,
		orderBy: { createdAt: "desc" },
	});

	const nextComment = await prisma.comment.findFirst({
		where: { taskId },
		skip: cursor.pageSize,
		orderBy: { createdAt: "desc" },
	});

	return {
		comments,
		cursor: {
			lastMessageId: comments[comments.length - 1]?.id ?? null,
			pageSize: cursor.pageSize,
			hasNextMessage: !!nextComment,
		},
	};
}

export async function updateTaskStatus(taskId: string, newStatus: TaskStatus) {
	await prisma.task.update({
		where: { id: taskId },
		data: {
			status: newStatus,
			updatedAt: new Date(),
		},
	});

	revalidatePath(`/`);

	return { success: true };
}

export async function addComment(
	taskId: string,
	content: string,
	author: string
) {
	const comment = await prisma.comment.create({
		data: {
			content,
			author,
			taskId,
		},
	});

	return comment;
}

interface NewTaskData {
	name: string;
	description?: string;
	priority: TaskPriority;
	assignee: string;
}
