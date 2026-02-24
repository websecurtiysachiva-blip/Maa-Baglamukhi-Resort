import React, { useState } from "react";
import AttendanceRow from "../components/Attendance/AttendanceRow";
import FiltersSection from "../components/Attendance/FiltersSection";
import SummaryCard from "../components/Attendance/SummaryCard";
import Modal from "../components/Hotel/Modal";
import AttendanceForm from "../components/Attendance/AttendanceForm";

const Attendance = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [department, setDepartment] = useState("All Departments");
  const [role, setRole] = useState("All Roles");
  const [searchQuery, setSearchQuery] = useState("");
  const [showManualEntryModal, setShowManualEntryModal] = useState(false);

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Receptionist",
      department: "Reception",
      checkIn: "09:05",
      checkOut: null,
      status: "Present",
      method: "Biometric",
    },
    {
      id: 2,
      name: "Ankit Verma",
      role: "Manager",
      department: "Management",
      checkIn: null,
      checkOut: null,
      status: "Absent",
      method: "Manual",
    },
  ]);

  const filteredEmployees = employees.filter((emp) => {
    const matchesDepartment =
      department === "All Departments" || emp.department === department;
    const matchesRole = role === "All Roles" || emp.role === role;
    const matchesSearch =
      searchQuery === "" ||
      emp.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDepartment && matchesRole && matchesSearch;
  });

  const totalStaff = employees.length;
  const presentStaff = employees.filter((e) => e.status === "Present").length;
  const absentStaff = employees.filter((e) => e.status === "Absent").length;
  const lateStaff = employees.filter((e) => e.status === "Late").length;
  const onLeaveStaff = employees.filter(
    (e) => e.status === "On Leave"
  ).length;

  const handleAddManualEntry = () => setShowManualEntryModal(true);

  return (
    <div className="min-h-screen p-6 text-white bg-gradient-to-br from-[#0f172a] via-[#020617] to-black">

      <h1 className="text-2xl font-semibold mb-6">Attendance Management</h1>

      <FiltersSection
        date={date}
        department={department}
        role={role}
        searchQuery={searchQuery}
        onDateChange={setDate}
        onDepartmentChange={setDepartment}
        onRoleChange={setRole}
        onSearchChange={setSearchQuery}
        onAddManualEntry={handleAddManualEntry}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 my-6">
        <SummaryCard label="Total Staff" value={totalStaff} />
        <SummaryCard label="Present" value={presentStaff} color="green" />
        <SummaryCard label="Absent" value={absentStaff} color="red" />
        <SummaryCard label="Late" value={lateStaff} color="yellow" />
        <SummaryCard label="On Leave" value={onLeaveStaff} color="blue" />
      </div>

      {/* Table */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-300 border-b border-white/10">
              <th className="p-3 text-left">Employee</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Check In</th>
              <th className="p-3 text-left">Check Out</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Method</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((employee) => (
              <AttendanceRow key={employee.id} employee={employee} />
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={showManualEntryModal}
        onClose={() => setShowManualEntryModal(false)}
        title="Add Manual Entry"
      >
        <AttendanceForm />
      </Modal>
    </div>
  );
};

export default Attendance;