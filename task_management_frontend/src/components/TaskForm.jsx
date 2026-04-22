import { useState } from "react";
import { createTask } from "../api/tasks";

function TaskForm({ onTaskCreated }) {

    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        status: "pending"
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setTaskData({
            ...taskData,
            [e.target.name]:e.target.value
        })
    };

    const handleSubmit = async () => {
        if (!taskData.title.trim()) {
            setError("Title is required");
            return;
        }

        try {
            await createTask(taskData);
            setTaskData({
                title: "",
                description: "",
                status: "pending"
            });
            setError("");
            onTaskCreated();

        } catch (err) {
            setError("Failed to create task");
            console.error(err);
        }
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-3 text-slate-700">Add Task</h3>

            {error && (
                <p className="text-red-500 mb-2 text-sm">{error}</p>
            )}

            <input
                type="text"
                name="title"
                placeholder="Enter title"
                value={taskData.title}
                onChange={handleChange}
                className="w-full mb-2 p-2 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />

            <input
                type="text"
                name="description"
                placeholder="Enter description"
                value={taskData.description}
                onChange={handleChange}
                className="w-full mb-2 p-2 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />

            <select
                name="status"
                value={taskData.status}
                onChange={handleChange}
                className="w-full mb-3 p-2 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <button 
                onClick={handleSubmit}
                className="w-full bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-800 transition"
            >
                Add Task
            </button>
        </div>
    );
}

export default TaskForm;