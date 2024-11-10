import { Task } from "@/types/task";

export const mockTasks: Task[] = [
	{
		id: "1",
		name: "Task 1",
		description: "Description for Task 1",
		priority: "high",
		status: "open",
		labels: [
			{
				id: "label1",
				name: "Urgent",
				color: "red",
			},
		],
		dueDate: new Date("2023-12-31T00:00:00.000Z"),
		createdAt: new Date("2023-01-01T00:00:00.000Z"),
		updatedAt: new Date("2023-01-02T00:00:00.000Z"),
		assignee: "User1",
		comments: [
			{
				id: "comment1",
				content: "This is a comment for Task 1",
				author: "User2",
				createdAt: new Date("2023-01-01T12:00:00.000Z"),
			},
		],
	},
	{
		id: "2",
		name: "Task 2",
		description: "Description for Task 2",
		priority: "medium",
		status: "in-progress",
		labels: [
			{
				id: "label2",
				name: "Review",
				color: "yellow",
			},
		],
		dueDate: new Date("2023-11-30T00:00:00.000Z"),
		createdAt: new Date("2023-02-01T00:00:00.000Z"),
		updatedAt: new Date("2023-02-02T00:00:00.000Z"),
		assignee: "User3",
		comments: [
			{
				id: "comment2",
				content: "This is a comment for Task 2",
				author: "User4",
				createdAt: new Date("2023-02-01T12:00:00.000Z"),
			},
		],
	},
	{
		id: "3",
		name: "Task 3",
		description: "Description for Task 3",
		priority: "low",
		status: "closed",
		labels: [
			{
				id: "label3",
				name: "Optional",
				color: "green",
			},
		],
		dueDate: new Date("2023-10-31T00:00:00.000Z"),
		createdAt: new Date("2023-03-01T00:00:00.000Z"),
		updatedAt: new Date("2023-03-02T00:00:00.000Z"),
		assignee: "User5",
		comments: [
			{
				id: "comment3",
				content: "This is a comment for Task 3",
				author: "User6",
				createdAt: new Date("2023-03-01T12:00:00.000Z"),
			},
		],
	},
	{
		id: "4",
		name: "Task 4",
		description: "Description for Task 4",
		priority: "medium",
		status: "open",
		labels: [
			{
				id: "label4",
				name: "Important",
				color: "blue",
			},
		],
		dueDate: new Date("2023-09-30T00:00:00.000Z"),
		createdAt: new Date("2023-04-01T00:00:00.000Z"),
		updatedAt: new Date("2023-04-02T00:00:00.000Z"),
		assignee: "User7",
		comments: [
			{
				id: "comment4",
				content: "This is a comment for Task 4",
				author: "User8",
				createdAt: new Date("2023-04-01T12:00:00.000Z"),
			},
		],
	},
	{
		id: "5",
		name: "Task 5",
		description: "Description for Task 5",
		priority: "high",
		status: "in-progress",
		labels: [
			{
				id: "label5",
				name: "Critical",
				color: "purple",
			},
		],
		dueDate: new Date("2023-08-31T00:00:00.000Z"),
		createdAt: new Date("2023-05-01T00:00:00.000Z"),
		updatedAt: new Date("2023-05-02T00:00:00.000Z"),
		assignee: "User9",
		comments: [
			{
				id: "comment5",
				content: "This is a comment for Task 5",
				author: "User10",
				createdAt: new Date("2023-05-01T12:00:00.000Z"),
			},
		],
	},
	{
		id: "6",
		name: "Task 6",
		description: "Description for Task 6",
		priority: "low",
		status: "closed",
		labels: [
			{
				id: "label6",
				name: "Low Priority",
				color: "gray",
			},
		],
		dueDate: new Date("2023-07-31T00:00:00.000Z"),
		createdAt: new Date("2023-06-01T00:00:00.000Z"),
		updatedAt: new Date("2023-06-02T00:00:00.000Z"),
		assignee: "User11",
		comments: [
			{
				id: "comment6",
				content: "This is a comment for Task 6",
				author: "User12",
				createdAt: new Date("2023-06-01T12:00:00.000Z"),
			},
		],
	},
	{
		id: "7",
		name: "Task 7",
		description: "Description for Task 7",
		priority: "medium",
		status: "open",
		labels: [
			{
				id: "label7",
				name: "Backlog",
				color: "orange",
			},
		],
		dueDate: new Date("2023-06-30T00:00:00.000Z"),
		createdAt: new Date("2023-07-01T00:00:00.000Z"),
		updatedAt: new Date("2023-07-02T00:00:00.000Z"),
		assignee: "User13",
		comments: [
			{
				id: "comment7",
				content: "This is a comment for Task 7",
				author: "User14",
				createdAt: new Date("2023-07-01T12:00:00.000Z"),
			},
		],
	},
	{
		id: "8",
		name: "Task 8",
		description: "Description for Task 8",
		priority: "high",
		status: "in-progress",
		labels: [
			{
				id: "label8",
				name: "High Priority",
				color: "black",
			},
		],
		dueDate: new Date("2023-05-31T00:00:00.000Z"),
		createdAt: new Date("2023-08-01T00:00:00.000Z"),
		updatedAt: new Date("2023-08-02T00:00:00.000Z"),
		assignee: "User15",
		comments: [
			{
				id: "comment8",
				content: "This is a comment for Task 8",
				author: "User16",
				createdAt: new Date("2023-08-01T12:00:00.000Z"),
			},
		],
	},
	{
		id: "9",
		name: "Task 9",
		description: "Description for Task 9",
		priority: "low",
		status: "closed",
		labels: [
			{
				id: "label9",
				name: "Completed",
				color: "green",
			},
		],
		dueDate: new Date("2023-04-30T00:00:00.000Z"),
		createdAt: new Date("2023-09-01T00:00:00.000Z"),
		updatedAt: new Date("2023-09-02T00:00:00.000Z"),
		assignee: "User17",
		comments: [
			{
				id: "comment9",
				content: "This is a comment for Task 9",
				author: "User18",
				createdAt: new Date("2023-09-01T12:00:00.000Z"),
			},
		],
	},
	{
		id: "10",
		name: "Task 10",
		description: "Description for Task 10",
		priority: "medium",
		status: "open",
		labels: [
			{
				id: "label10",
				name: "Pending",
				color: "blue",
			},
		],
		dueDate: new Date("2023-03-31T00:00:00.000Z"),
		createdAt: new Date("2023-10-01T00:00:00.000Z"),
		updatedAt: new Date("2023-10-02T00:00:00.000Z"),
		assignee: "User19",
		comments: [
			{
				id: "comment10",
				content: "This is a comment for Task 10",
				author: "User20",
				createdAt: new Date("2023-10-01T12:00:00.000Z"),
			},
		],
	},
	{
		id: "11",
		name: "Task 11",
		description: "Description for Task 11",
		priority: "high",
		status: "in-progress",
		labels: [
			{
				id: "label11",
				name: "Urgent",
				color: "red",
			},
		],
		dueDate: new Date("2023-02-28T00:00:00.000Z"),
		createdAt: new Date("2023-11-01T00:00:00.000Z"),
		updatedAt: new Date("2023-11-02T00:00:00.000Z"),
		assignee: "User21",
		comments: [
			{
				id: "comment11",
				content: "This is a comment for Task 11",
				author: "User22",
				createdAt: new Date("2023-11-01T12:00:00.000Z"),
			},
		],
	},
	{
		id: "12",
		name: "Task 12",
		description: "Description for Task 12",
		priority: "low",
		status: "closed",
		labels: [
			{
				id: "label12",
				name: "Optional",
				color: "gray",
			},
		],
		dueDate: new Date("2023-01-31T00:00:00.000Z"),
		createdAt: new Date("2023-12-01T00:00:00.000Z"),
		updatedAt: new Date("2023-12-02T00:00:00.000Z"),
		assignee: "User23",
		comments: [
			{
				id: "comment12",
				content: "This is a comment for Task 12",
				author: "User24",
				createdAt: new Date("2023-12-01T12:00:00.000Z"),
			},
		],
	},
	{
		id: "13",
		name: "Task 13",
		description: "Description for Task 13",
		priority: "medium",
		status: "open",
		labels: [
			{
				id: "label13",
				name: "Review",
				color: "yellow",
			},
		],
		dueDate: new Date("2023-12-15T00:00:00.000Z"),
		createdAt: new Date("2023-01-15T00:00:00.000Z"),
		updatedAt: new Date("2023-01-16T00:00:00.000Z"),
		assignee: "User25",
		comments: [
			{
				id: "comment13",
				content: "This is a comment for Task 13",
				author: "User26",
				createdAt: new Date("2023-01-15T12:00:00.000Z"),
			},
		],
	},
	{
		id: "14",
		name: "Task 14",
		description: "Description for Task 14",
		priority: "high",
		status: "in-progress",
		labels: [
			{
				id: "label14",
				name: "Critical",
				color: "purple",
			},
		],
		dueDate: new Date("2023-11-15T00:00:00.000Z"),
		createdAt: new Date("2023-02-15T00:00:00.000Z"),
		updatedAt: new Date("2023-02-16T00:00:00.000Z"),
		assignee: "User27",
		comments: [
			{
				id: "comment14",
				content: "This is a comment for Task 14",
				author: "User28",
				createdAt: new Date("2023-02-15T12:00:00.000Z"),
			},
		],
	},
	{
		id: "15",
		name: "Task 15",
		description: "Description for Task 15",
		priority: "low",
		status: "closed",
		labels: [
			{
				id: "label15",
				name: "Low Priority",
				color: "gray",
			},
		],
		dueDate: new Date("2023-10-15T00:00:00.000Z"),
		createdAt: new Date("2023-03-15T00:00:00.000Z"),
		updatedAt: new Date("2023-03-16T00:00:00.000Z"),
		assignee: "User29",
		comments: [
			{
				id: "comment15",
				content: "This is a comment for Task 15",
				author: "User30",
				createdAt: new Date("2023-03-15T12:00:00.000Z"),
			},
		],
	},
	{
		id: "16",
		name: "Task 16",
		description: "Description for Task 16",
		priority: "medium",
		status: "open",
		labels: [
			{
				id: "label16",
				name: "Backlog",
				color: "orange",
			},
		],
		dueDate: new Date("2023-09-15T00:00:00.000Z"),
		createdAt: new Date("2023-04-15T00:00:00.000Z"),
		updatedAt: new Date("2023-04-16T00:00:00.000Z"),
		assignee: "User31",
		comments: [
			{
				id: "comment16",
				content: "This is a comment for Task 16",
				author: "User32",
				createdAt: new Date("2023-04-15T12:00:00.000Z"),
			},
		],
	},
	{
		id: "17",
		name: "Task 17",
		description: "Description for Task 17",
		priority: "high",
		status: "in-progress",
		labels: [
			{
				id: "label17",
				name: "High Priority",
				color: "black",
			},
		],
		dueDate: new Date("2023-08-15T00:00:00.000Z"),
		createdAt: new Date("2023-05-15T00:00:00.000Z"),
		updatedAt: new Date("2023-05-16T00:00:00.000Z"),
		assignee: "User33",
		comments: [
			{
				id: "comment17",
				content: "This is a comment for Task 17",
				author: "User34",
				createdAt: new Date("2023-05-15T12:00:00.000Z"),
			},
		],
	},
	{
		id: "18",
		name: "Task 18",
		description: "Description for Task 18",
		priority: "low",
		status: "closed",
		labels: [
			{
				id: "label18",
				name: "Completed",
				color: "green",
			},
		],
		dueDate: new Date("2023-07-15T00:00:00.000Z"),
		createdAt: new Date("2023-06-15T00:00:00.000Z"),
		updatedAt: new Date("2023-06-16T00:00:00.000Z"),
		assignee: "User35",
		comments: [
			{
				id: "comment18",
				content: "This is a comment for Task 18",
				author: "User36",
				createdAt: new Date("2023-06-15T12:00:00.000Z"),
			},
		],
	},
	{
		id: "19",
		name: "Task 19",
		description: "Description for Task 19",
		priority: "medium",
		status: "open",
		labels: [
			{
				id: "label19",
				name: "Pending",
				color: "blue",
			},
		],
		dueDate: new Date("2023-06-15T00:00:00.000Z"),
		createdAt: new Date("2023-07-15T00:00:00.000Z"),
		updatedAt: new Date("2023-07-16T00:00:00.000Z"),
		assignee: "User37",
		comments: [
			{
				id: "comment19",
				content: "This is a comment for Task 19",
				author: "User38",
				createdAt: new Date("2023-07-15T12:00:00.000Z"),
			},
		],
	},
	{
		id: "20",
		name: "Task 20",
		description: "Description for Task 20",
		priority: "high",
		status: "in-progress",
		labels: [
			{
				id: "label20",
				name: "Urgent",
				color: "red",
			},
		],
		dueDate: new Date("2023-05-15T00:00:00.000Z"),
		createdAt: new Date("2023-08-15T00:00:00.000Z"),
		updatedAt: new Date("2023-08-16T00:00:00.000Z"),
		assignee: "User39",
		comments: [
			{
				id: "comment20",
				content: "This is a comment for Task 20",
				author: "User40",
				createdAt: new Date("2023-08-15T12:00:00.000Z"),
			},
		],
	},
];
