import './AttendanceRow.css';

const AttendanceRow = ({ employee, onCheckIn, onCheckOut, onMarkPresent }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Present':
        return 'status-present';
      case 'Absent':
        return 'status-absent';
      case 'Late':
        return 'status-late';
      case 'On Leave':
        return 'status-leave';
      default:
        return '';
    }
  };

  const getMethodClass = (method) => {
    switch (method) {
      case 'Biometric':
        return 'status-biometric';
      case 'Manual':
        return 'status-manual';
      default:
        return '';
    }
  };

  return (
    <tr className="table-row">
      <td className="table-td">{employee.name}</td>
      <td className="table-td">{employee.role}</td>
      <td className="table-td">{employee.checkIn || '—'}</td>
      <td className="table-td">{employee.checkOut || '—'}</td>
      <td className="table-td">
        <span className={`status-badge ${getStatusClass(employee.status)}`}>
          {employee.status}
        </span>
      </td>
      <td className="table-td">
        <span className={`status-badge ${getMethodClass(employee.method)}`}>
          {employee.method}
        </span>
      </td>
      <td className="table-td">
        <div className="action-buttons">
          {employee.status === 'Present' && employee.checkIn && !employee.checkOut && (
            <>
              <button 
                className="action-btn action-btn-green"
                onClick={() => onCheckIn(employee)}
              >
                Check In
              </button>
              <button 
                className="action-btn action-btn-red"
                onClick={() => onCheckOut(employee)}
              >
                Check Out
              </button>
            </>
          )}
          {employee.status === 'Absent' && (
            <button 
              className="action-btn action-btn-blue"
              onClick={() => onMarkPresent(employee)}
            >
              Mark Present
            </button>
          )}
          {!employee.checkIn && employee.status !== 'Absent' && (
            <button 
              className="action-btn action-btn-green"
              onClick={() => onCheckIn(employee)}
            >
              Check In
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default AttendanceRow;

