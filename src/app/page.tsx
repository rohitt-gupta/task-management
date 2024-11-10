'use client';
import TaskTable from '../components/TaskTable';
import StatusTabs from '../components/StatusTabs';
// import TaskModal from '../components/TaskModal';
import useTaskStore from '../store/taskStore';
import TaskModal from '@/components/TaskModal';

function App() {
  const { selectedTaskId } = useTaskStore();
  console.log(selectedTaskId);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mx-auto sm:px-6 lg:px-8 py-6 max-w-7xl">
        <div className="px-4 sm:px-0 py-6">
          <StatusTabs />
          <div className="mt-4">
            <TaskTable />
          </div>
          {selectedTaskId && <TaskModal />}
        </div>
      </div>
    </div>
  );
}

export default App;