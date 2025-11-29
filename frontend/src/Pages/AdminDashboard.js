import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "student" });

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users/");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create User
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/create/", newUser);
      alert("User created!");
      setNewUser({ username: "", password: "", role: "student" });
      fetchUsers();
    } catch (err) {
      console.error("Failed to create user:", err);
      alert("Failed to create user");
    }
  };

  // Delete User
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/users/${id}/delete/`);
      alert("User deleted!");
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Failed to delete user");
    }
  };

  // Assign a task
  const assignTask = async (studentId, task) => {
    try {
      await api.post("/assignments/", { studentId, task });
      alert("Assignment assigned!");
      setAssignments((prev) => [...prev, { studentId, task }]);
    } catch (err) {
      console.error("Failed to assign task:", err);
      alert("Failed to assign task");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>

      <div className="create-user-section">
        <h2>Create User</h2>
        <form onSubmit={handleCreateUser}>
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Create</button>
        </form>
      </div>

      <h2>All Users</h2>
      {users.length > 0 ? (
        <table className="users-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => handleDeleteUser(u.id)}>Delete</button>
                  {u.role === 'student' && (
                    <button onClick={() => {
                      const task = prompt("Enter task:");
                      if (task) assignTask(u.id, task);
                    }}>Assign Task</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}

      {assignments.length > 0 && (
        <div className="assignments-preview">
          <h2>Assignments (Preview)</h2>
          {assignments.map((a, index) => (
            <div key={index}>
              Student ID: {a.studentId}, Task: {a.task}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
