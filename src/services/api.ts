import { mockTasks } from "@/data/tasks";
import fs from "fs/promises";
import path from "path";
import {
	Task,
	TaskStatus,
	PageDetails,
	TaskComment,
	CommentCursor,
	TaskPriority,
} from "../types/task";

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchTasks(status: TaskStatus, pageDetails: PageDetails) {
	const mockTasks1 = mockTasks.filter((task: Task) => task.status === status);

	return {
		tasks: mockTasks1,
		pageDetails: {
			pageSize: pageDetails.pageSize,
			hasNext: pageDetails.offset < 100, // Mock pagination
		},
	};
}

export async function fetchComments(taskId: string, cursor: CommentCursor) {
	return {
		comments: Array.from({ length: 5 }, (_, i) => ({
			id: `${taskId}-comment-${i}`,
			content: `This is comment ${i} for task ${taskId}`,
			author: "John Doe",
			createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
		})),
		cursor: {
			lastMessageId: `${taskId}-comment-4`,
			pageSize: cursor.pageSize,
			hasNextMessage: false,
		},
	};
}

export async function updateTaskStatus(taskId: string, newStatus: TaskStatus) {
	const filePath = path.join(process.cwd(), "src/data/tasks.ts");
	const fileContent = await fs.readFile(filePath, "utf-8");
	const updatedContent = fileContent.replace(
		new RegExp(`(id:\\s*["']${taskId}["'].*?status:\\s*["'])\\w+(["'])`, "s"),
		`$1${newStatus}$2`
	);

	await fs.writeFile(filePath, updatedContent, "utf-8");
	return { success: true };
}

export async function addComment(taskId: string, content: string) {
	return {
		id: crypto.randomUUID(),
		content,
		author: "Current User",
		createdAt: new Date(),
	};
}
