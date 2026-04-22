import { useState, useEffect } from "react";
import { getTasks, updateTask, deleteTask } from "../api/tasks";
import TaskForm from "../components/TaskForm";
import { Pencil, Trash2, Check } from "lucide-react";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [error, setError] = useState("");

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            setError("Something went wrong");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleUpdate = async () => {
        if (!editingTask) return;

        try {
            await updateTask(editingTask.id, editingTask);
            setEditingTask(null);
            setError("");
            fetchTasks();
        } catch (err) {
            setError("Failed to update");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks((prev) => prev.filter(task => task.id !== id));
            setError("");
        } catch (err) {
            setError("Failed to delete");
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 p-6">
            <div className="max-w-2xl mx-auto">

                <div className="mb-6 bg-white p-4 rounded-2xl shadow">
                    <TaskForm onTaskCreated={fetchTasks} />
                </div>

                {error && (
                    <p className="text-red-500 mb-4 text-center">{error}</p>
                )}

                {tasks.map((task) => (
                    <div 
                        key={task.id} 
                        className="bg-white p-4 mb-4 rounded-2xl shadow space-y-2"
                    >
                        <p className="font-semibold text-lg text-slate-800">
                            {task.title}
                        </p>

                        <p className="text-slate-600">
                            {task.description}
                        </p>

                        <p className="inline-block mt-1 px-4 py-2 text-sm font-bold text-slate-700 bg-slate-200 rounded capitalize">
                        {task.status.replace("_", " ").toUpperCase()}
                        </p>

                        <div className="mt-3 flex gap-2">
                            <button 
                                onClick={() => setEditingTask(task)}
                                className="bg-sky-400 p-2 rounded-lg hover:bg-slate-400"
                            >
                                <Pencil size={16} />
                            </button>

                            <button 
                                onClick={() => handleDelete(task.id)}
                                className="bg-red-400 text-white p-2 rounded-lg hover:bg-slate-800"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        {editingTask?.id === task.id && (
                            <div className="mt-4 p-4 border border-slate-200 rounded-xl bg-slate-50">
                                
                                <input
                                    type="text"
                                    value={editingTask.title}
                                    onChange={(e) =>
                                        setEditingTask({
                                            ...editingTask,
                                            title: e.target.value
                                        })
                                    }
                                    className="w-full mb-2 p-2 border border-slate-300 rounded-lg bg-white"
                                />

                                <input
                                    type="text"
                                    value={editingTask.description}
                                    onChange={(e) =>
                                        setEditingTask({
                                            ...editingTask,
                                            description: e.target.value
                                        })
                                    }
                                    className="w-full mb-2 p-2 border border-slate-300 rounded-lg bg-white"
                                />

                                <select
                                    value={editingTask.status}
                                    onChange={(e) =>
                                        setEditingTask({
                                            ...editingTask,
                                            status: e.target.value
                                        })
                                    }
                                    className="w-full mb-2 p-2 border border-slate-300 rounded-lg bg-white"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>

                                <div className="flex gap-2 mt-2">
                                    <button 
                                        onClick={handleUpdate}
                                        className="bg-slate-700 text-white p-2 rounded-lg hover:bg-slate-800"
                                    >
                                        <Check size={16} />
                                    </button>

                                    <button 
                                        onClick={() => setEditingTask(null)}
                                        className="bg-slate-300 px-3 py-1 rounded-lg hover:bg-slate-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tasks;