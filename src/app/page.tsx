import { fetchAllTasks, fetchCounts } from "@/services/api";
import HomePage from "@/components/HomePage";
import { Task, TaskStatus } from "@/types/task";

export default async function Home() {

  const counts = await fetchCounts();
  const { tasks } = await fetchAllTasks();
  const getData = async (status: TaskStatus) => {
    'use server';
    return {
      tasks: tasks.filter((task: Task) => task.status === status),
    };
  };

  return <HomePage initialData={await getData("open")} getData={getData} counts={counts} />;
}
