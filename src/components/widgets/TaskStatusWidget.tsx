const TaskStatusWidget = ({
  completed,
  progress,
  notCompleted,
}: {
  completed: number;
  progress: number;
  notCompleted: number;
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Task Status</h3>
      <p className="text-green-500">Completed: {completed}</p>
      <p className="text-yellow-500">On Progress: {progress}</p>
      <p className="text-red-500">Not Completed: {notCompleted}</p>
    </div>
  );
};

export default TaskStatusWidget;
