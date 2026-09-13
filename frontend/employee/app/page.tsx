"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [employees, setEmployees] = useState<any[]>([]);
  
  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  // Reusable function to fetch employees from backend
  const fetchEmployees = () => {
    axios
      .get("http://localhost:5000/employees")
      .then((res) => {
        console.log("Data received from backend:", res.data);
        setEmployees(res.data);
      })
      .catch((err) => {
        console.error("Axios fetch error:", err);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle form submission to database
  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !department) {
      alert("Please fill in all fields.");
      return;
    }

    const newEmployee = { name, email, department };

    axios
      .post("http://localhost:5000/employees", newEmployee)
      .then((res) => {
        console.log("Employee saved successfully:", res.data);
        // Instantly refresh the UI list from database values
        fetchEmployees(); 
        
        // Reset the form fields
        setName("");
        setEmail("");
        setDepartment("");
      })
      .catch((err) => {
        console.error("Error adding employee:", err);
        alert("Failed to save employee to database.");
      });
  };

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Employee Dashboard</h1>

      {/* Add Employee Form Section */}
      <form onSubmit={handleAddEmployee} className="mb-10 p-5 border rounded bg-gray-50 flex flex-wrap gap-4 items-end">
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full bg-white text-black"
          />
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full bg-white text-black"
          />
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <label className="text-sm font-medium text-gray-700">Department</label>
          <input
            type="text"
            placeholder="Engineering"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border p-2 rounded w-full bg-white text-black"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          Add Employee
        </button>
      </form>

      {/* Employee Data Table */}
      <table className="border w-full text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Department</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan={4} className="border p-4 text-center text-gray-500">
                No employees found in the database.
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="border p-2">{emp.id}</td>
                <td className="border p-2">{emp.name}</td>
                <td className="border p-2">{emp.email}</td>
                <td className="border p-2">{emp.department}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}
