import React, { useState, useEffect } from "react";
import SummaryCard from '../components/Attendance/SummaryCard';
import AttendanceRow from '../components/Attendance/AttendanceRow';
import FiltersSection from '../components/Attendance/FiltersSection';
import Modal from '../components/Hotel/Modal';
import AttendanceForm from '../components/Attendance/AttendanceForm';
import './Attendance.css';

const Attendance = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [department, setDepartment] = useState('All Departments');
  const [role, setRole] = useState('All Roles');
  const [searchQuery, setSearchQuery] = useState('');
  const [showManualEntryModal, setShowManualEntryModal] = useState(false);

  const [employees, setEmployees] = useState([
    { 
      id: 1, 
      name: 'Rahul Sharma', 
      role: 'Receptionist', 
      department: 'Reception',
      checkIn: '09:05', 
      checkOut: null, 
      status: 'Present', 
      method: 'Biometric' 
    },
    { 
      id: 2, 
      name: 'Ankit Verma', 
      role: 'Manager', 
      department: 'Management',
      checkIn: null, 
      checkOut: null, 
      status: 'Absent', 
      method: 'Manual' 
    },
    { 
      id: 3, 
      name: 'Priya Patel', 
      role: 'Staff', 
      department: 'Housekeeping',
      checkIn: '08:45', 
      checkOut: null, 
      status: 'Present', 
      method: 'Biometric' 
    },
    { 
      id: 4, 
      name: 'Amit Kumar', 
      role: 'Staff', 
      department: 'Kitchen',
      checkIn: '09:15', 
      checkOut: null, 
      status: 'Late', 
      method: 'Biometric' 
    },
    { 
      id: 5, 
      name: 'Sneha Reddy', 
      role: 'Receptionist', 
      department: 'Reception',
      checkIn: null, 
      checkOut: null, 
      status: 'On Leave', 
      method: 'Manual' 
    },
  ]);

  // Filter employees based on filters
  const filteredEmployees = employees.filter(emp => {
    const matchesDepartment = department === 'All Departments' || emp.department === department;
    const matchesRole = role === 'All Roles' || emp.role === role;
    const matchesSearch = searchQuery === '' || 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesDepartment && matchesRole && matchesSearch;
  });

  // Calculate summary statistics
  const totalStaff = employees.length;
  const presentStaff = employees.filter(e => e.status === 'Present').length;
  const absentStaff = employees.filter(e => e.status === 'Absent').length;
  const lateStaff = employees.filter(e => e.status === 'Late').length;
  const onLeaveStaff = employees.filter(e => e.status === 'On Leave').length;

  const handleAddManualEntry = () => {
    setShowManualEntryModal(true);
  };

  const handleManualEntrySubmit = (formData) => {
    const newEmployee = {
      id: employees.length + 1,
      name: formData.employeeName,
      role: formData.role,
      department: formData.department,
      checkIn: formData.checkIn || null,
      checkOut: formData.checkOut || null,
      status: formData.status,
      method: formData.method,
    };

    setEmployees(prev => [...prev, newEmployee]);
    alert(`Manual entry added for ${formData.employeeName}`);
    setShowManualEntryModal(false);
  };

  const handleCheckIn = (employee) => {
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setEmployees(prev => prev.map(emp => 
      emp.id === employee.id 
        ? { ...emp, checkIn: timeString, status: 'Present', checkOut: null }
        : emp
    ));
    alert(`${employee.name} checked in at ${timeString}`);
  };

  const handleCheckOut = (employee) => {
    if (!employee.checkIn) {
      alert('Employee must check in first');
      return;
    }

    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setEmployees(prev => prev.map(emp => 
      emp.id === employee.id 
        ? { ...emp, checkOut: timeString }
        : emp
    ));
    alert(`${employee.name} checked out at ${timeString}`);
  };

  const handleMarkPresent = (employee) => {
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setEmployees(prev => prev.map(emp => 
      emp.id === employee.id 
        ? { ...emp, status: 'Present', checkIn: timeString, checkOut: null, method: 'Manual' }
        : emp
    ));
    alert(`${employee.name} marked as present`);
  };

  return (
    <div className="attendance-container">
      {/* Page Title */}
      <h1 className="attendance-title">Attendance Management</h1>

      {/* Filters Section */}
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
      <div className="summary-cards">
        <SummaryCard 
          label="Total Staff" 
          value={totalStaff}
          onClick={() => alert(`Total Staff: ${totalStaff}`)}
        />
        <SummaryCard 
          label="Present" 
          value={presentStaff}
          color="green"
          bgColor="green"
          onClick={() => alert(`Present Staff: ${presentStaff}`)}
        />
        <SummaryCard 
          label="Absent" 
          value={absentStaff}
          color="red"
          bgColor="red"
          onClick={() => alert(`Absent Staff: ${absentStaff}`)}
        />
        <SummaryCard 
          label="Late" 
          value={lateStaff}
          color="yellow"
          bgColor="yellow"
          onClick={() => alert(`Late Staff: ${lateStaff}`)}
        />
        <SummaryCard 
          label="On Leave" 
          value={onLeaveStaff}
          color="blue"
          bgColor="blue"
          onClick={() => alert(`Staff On Leave: ${onLeaveStaff}`)}
        />
      </div>

      {/* Attendance Table */}
      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead className="table-header">
            <tr>
              <th className="table-th">Employee</th>
              <th className="table-th">Role</th>
              <th className="table-th">Check In</th>
              <th className="table-th">Check Out</th>
              <th className="table-th">Status</th>
              <th className="table-th">Method</th>
              <th className="table-th">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <AttendanceRow
                  key={employee.id}
                  employee={employee}
                  onCheckIn={handleCheckIn}
                  onCheckOut={handleCheckOut}
                  onMarkPresent={handleMarkPresent}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="table-td" style={{ textAlign: 'center', padding: '20px' }}>
                  No employees found matching the filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Manual Entry Modal */}
      <Modal 
        isOpen={showManualEntryModal} 
        onClose={() => setShowManualEntryModal(false)}
        title="Add Manual Entry"
      >
        <AttendanceForm
          onSubmit={handleManualEntrySubmit}
          onCancel={() => setShowManualEntryModal(false)}
          initialData={{ date }}
        />
      </Modal>
    </div>
  );
};

export default Attendance;
