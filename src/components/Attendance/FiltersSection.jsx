import './FiltersSection.css';

const FiltersSection = ({ 
  date, 
  department, 
  role, 
  searchQuery, 
  onDateChange, 
  onDepartmentChange, 
  onRoleChange, 
  onSearchChange, 
  onAddManualEntry 
}) => {
  return (
    <div className="filters-section">
      <input 
        type="date" 
        className="filter-input" 
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
      />
      
      <select 
        className="filter-select"
        value={department}
        onChange={(e) => onDepartmentChange(e.target.value)}
      >
        <option>All Departments</option>
        <option>Reception</option>
        <option>Kitchen</option>
        <option>Housekeeping</option>
        <option>Management</option>
        <option>Security</option>
      </select>

      <select 
        className="filter-select"
        value={role}
        onChange={(e) => onRoleChange(e.target.value)}
      >
        <option>All Roles</option>
        <option>Admin</option>
        <option>Manager</option>
        <option>Staff</option>
        <option>Receptionist</option>
      </select>

      <input
        type="text"
        placeholder="Search Employee"
        className="filter-search"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <button 
        className="add-entry-btn"
        onClick={onAddManualEntry}
      >
        + Add Manual Entry
      </button>
    </div>
  );
};

export default FiltersSection;

