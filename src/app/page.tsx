import { fetchAllTasks, fetchCounts } from "@/services/api";
import HomePage from "@/components/HomePage";
import { Task, TaskStatus } from "@/types/task";

export default async function Home() {

  const counts = await fetchCounts();
  console.log("counts", counts);
  const getData = async (status: TaskStatus) => {
    'use server';
    const data = await fetchAllTasks();
    console.log("data", status);
    return {
      tasks: data.tasks.filter((task: Task) => task.status === status),
    };
  };

  return <HomePage initialData={await getData("open")} getData={getData} counts={counts} />;
}
