import './BookingRow.css';

const BookingRow = ({ booking, onExtend, onShiftRoom, onCheckOut }) => {
  return (
    <tr className="table-row">
      <td className="table-td">{booking.guestName}</td>
      <td className="table-td">{booking.room}</td>
      <td className="table-td">{booking.checkIn}</td>
      <td className="table-td">{booking.checkOut}</td>
      <td className="table-td">
        <span className={`status-badge status-${booking.status.toLowerCase()}`}>
          {booking.status}
        </span>
      </td>
      <td className="table-td">
        <div className="action-buttons-inline">
          <button 
            className="action-btn-small action-btn-blue"
            onClick={() => onExtend(booking)}
          >
            Extend
          </button>
          <button 
            className="action-btn-small action-btn-yellow"
            onClick={() => onShiftRoom(booking)}
          >
            Shift Room
          </button>
          <button 
            className="action-btn-small action-btn-red"
            onClick={() => onCheckOut(booking)}
          >
            Check-Out
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BookingRow;

