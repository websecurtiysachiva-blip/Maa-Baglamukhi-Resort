import { useState } from 'react';
import './RoomCard.css';

const RoomCard = ({ room, onRoomClick, onCheckIn, onCheckOut, onMarkCleaning, onMarkAvailable }) => {
  const [showActions, setShowActions] = useState(false);

  const handleCardClick = () => {
    if (onRoomClick) {
      onRoomClick(room);
    }
    setShowActions(!showActions);
  };

  const handleActionClick = (e, action) => {
    e.stopPropagation();
    if (action === 'checkIn' && onCheckIn) {
      onCheckIn(room);
    } else if (action === 'checkOut' && onCheckOut) {
      onCheckOut(room);
    } else if (action === 'cleaning' && onMarkCleaning) {
      onMarkCleaning(room);
    }
    setShowActions(false);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Available':
        return 'room-available';
      case 'Occupied':
        return 'room-occupied';
      case 'Cleaning':
        return 'room-cleaning';
      default:
        return '';
    }
  };

  return (
    <div 
      className={`room-card ${getStatusClass(room.status)} ${showActions ? 'room-card-active' : ''}`}
      onClick={handleCardClick}
    >
      <h3 className="room-number">Room {room.number}</h3>
      <p className="room-status">Status: {room.status}</p>
      {room.guest && (
        <p className="room-guest">Guest: {room.guest}</p>
      )}
      {room.checkIn && (
        <p className="room-checkin">Check-In: {room.checkIn}</p>
      )}
      {room.checkOut && (
        <p className="room-checkout">Check-Out: {room.checkOut}</p>
      )}
      
      {showActions && (
        <div className="room-actions" onClick={(e) => e.stopPropagation()}>
          {room.status === 'Available' && (
            <button 
              className="room-action-btn room-action-green"
              onClick={(e) => handleActionClick(e, 'checkIn')}
            >
              Check-In
            </button>
          )}
          {room.status === 'Occupied' && (
            <>
              <button 
                className="room-action-btn room-action-red"
                onClick={(e) => handleActionClick(e, 'checkOut')}
              >
                Check-Out
              </button>
              <button 
                className="room-action-btn room-action-yellow"
                onClick={(e) => handleActionClick(e, 'cleaning')}
              >
                Mark Cleaning
              </button>
            </>
          )}
          {room.status === 'Cleaning' && (
            <button 
              className="room-action-btn room-action-green"
              onClick={(e) => {
                e.stopPropagation();
                if (onMarkAvailable) {
                  onMarkAvailable(room);
                }
                setShowActions(false);
              }}
            >
              Mark Available
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RoomCard;

