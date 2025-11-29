import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const { logout } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await api.get("/my-assignments/");
        setAssignments(res.data);
      } catch (err) {
        console.error("Failed to fetch assignments:", err);
      }
    };
    fetchAssignments();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Student Dashboard</h1>
      <button onClick={logout}>Logout</button>

      <h2>Assignments</h2>
      {assignments.length > 0 ? (
        assignments.map((a) => (
          <div key={a.id} className="assignment-card">
            {a.task}
          </div>
        ))
      ) : (
        <p>No assignments found.</p>
      )}
    </div>
  );
};

export default StudentDashboard;
