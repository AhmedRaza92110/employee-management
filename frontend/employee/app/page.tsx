"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch(console.error);
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        Employee Dashboard
      </h1>

      <table className="border w-full">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Department</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td className="border p-2">{emp.id}</td>
              <td className="border p-2">{emp.name}</td>
              <td className="border p-2">{emp.email}</td>
              <td className="border p-2">{emp.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}