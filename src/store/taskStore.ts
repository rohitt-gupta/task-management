import { create } from "zustand";
import {
	Task,
	TaskStatus,
	PageDetails,
	SortingType,
	SortingOrder,
	TaskPriority,
} from "../types/task";
import * as api from "../services/api";
import { mockTasks } from "@/data/tasks";

interface TaskStore {
	tasks: Task[];
	selectedTaskId: string | null;
	currentStatus: TaskStatus;
	loading: boolean;
	pageDetails: Record<TaskStatus, PageDetails>;
	sortingType: SortingType;
	sortingOrder: SortingOrder;

	setCurrentStatus: (status: TaskStatus) => void;
	setSelectedTaskId: (id: string | null) => void;
	updateTaskStatus: (taskId: string, newStatus: TaskStatus) => Promise<void>;
	addComment: (taskId: string, content: string) => Promise<void>;
	loadMoreTasks: (status: TaskStatus) => Promise<void>;
	setSorting: (type: SortingType, order: SortingOrder) => Promise<void>;
}

const initialPageDetails: PageDetails = {
	pageSize: 20,
	offset: 0,
	sortingType: "CREATION",
	sortingOrder: "DESC",
};

const useTaskStore = create<TaskStore>((set, get) => ({
	tasks: mockTasks,
	selectedTaskId: null,
	currentStatus: "open",
	loading: false,
	pageDetails: {
		open: { ...initialPageDetails },
		"in-progress": { ...initialPageDetails },
		closed: { ...initialPageDetails },
	},
	sortingType: "CREATION",
	sortingOrder: "DESC",

	setCurrentStatus: (status) => set({ currentStatus: status }),
	setSelectedTaskId: (id) => set({ selectedTaskId: id }),

	updateTaskStatus: async (taskId, newStatus) => {
		try {
			await api.updateTaskStatus(taskId, newStatus);
			set((state) => {
				const task = state.tasks.find((t: Task) => t.id === taskId);
				const oldStatus = task?.status;
				if (!task || !oldStatus) return state;

				const currentTasks = state.tasks;
				const currentIndex = currentTasks.findIndex(
					(t: Task) => t.id === taskId
				);
				const nextTaskId =
					currentTasks[currentIndex + 1]?.id ||
					currentTasks[currentIndex - 1]?.id;

				return {
					tasks: state.tasks.map((t) =>
						t.id === taskId ? { ...t, status: newStatus } : t
					),
					selectedTaskId: nextTaskId,
				};
			});
		} catch (error) {
			console.error("Failed to update task status:", error);
		}
	},

	addComment: async (taskId, content) => {
		const comment = await api.addComment(taskId, content);
		set((state) => {
			const task = state.tasks.find((t: Task) => t.id === taskId);
			const status = task?.status;
			if (!task || !status) return state;

			return {
				tasks: state.tasks.map((task) =>
					task.id === taskId
						? { ...task, comments: [...task.comments, comment] }
						: task
				),
			};
		});
	},

	loadMoreTasks: async (status) => {
		const state = get();
		if (state.loading) return;

		set({ loading: true });
		try {
			const response = await api.fetchTasks(status, state.pageDetails[status]);
			console.log("response", response);
			set((state) => ({
				tasks: [...state.tasks, ...response.tasks],
				pageDetails: {
					...state.pageDetails,
					[status]: {
						...state.pageDetails[status],
						offset: state.pageDetails[status].offset + response.tasks.length,
					},
				},
			}));
		} finally {
			set({ loading: false });
		}
	},

	setSorting: async (type, order) => {
		set((state) => ({
			...state,
			sortingType: type,
			sortingOrder: order,
			pageDetails: {
				open: {
					...state.pageDetails.open,
					sortingType: type,
					sortingOrder: order,
				},
				"in-progress": {
					...state.pageDetails["in-progress"],
					sortingType: type,
					sortingOrder: order,
				},
				closed: {
					...state.pageDetails.closed,
					sortingType: type,
					sortingOrder: order,
				},
			},
		}));

		const { currentStatus } = get();
		await get().loadMoreTasks(currentStatus);
	},
}));

export default useTaskStore;
