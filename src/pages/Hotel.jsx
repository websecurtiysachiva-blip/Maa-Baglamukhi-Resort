import React, { useState, useEffect } from "react";
import SummaryCard from '../components/Hotel/SummaryCard';
import RoomCard from '../components/Hotel/RoomCard';
import BookingRow from '../components/Hotel/BookingRow';
import Modal from '../components/Hotel/Modal';
import BookingForm from '../components/Hotel/BookingForm';
import './Hotel.css';

const Hotel = () => {
  const [rooms, setRooms] = useState([
    { number: '101', status: 'Available', guest: null, checkIn: null, checkOut: null },
    { number: '102', status: 'Occupied', guest: 'Rahul Sharma', checkIn: '16 Feb 2026', checkOut: '18 Feb 2026' },
    { number: '103', status: 'Cleaning', guest: null, checkIn: null, checkOut: null },
    { number: '104', status: 'Available', guest: null, checkIn: null, checkOut: null },
    { number: '105', status: 'Occupied', guest: 'Priya Patel', checkIn: '15 Feb 2026', checkOut: '20 Feb 2026' },
    { number: '106', status: 'Available', guest: null, checkIn: null, checkOut: null },
    { number: '107', status: 'Occupied', guest: 'Amit Kumar', checkIn: '17 Feb 2026', checkOut: '19 Feb 2026' },
    { number: '108', status: 'Cleaning', guest: null, checkIn: null, checkOut: null },
    { number: '109', status: 'Available', guest: null, checkIn: null, checkOut: null },
    { number: '110', status: 'Occupied', guest: 'Sneha Reddy', checkIn: '16 Feb 2026', checkOut: '21 Feb 2026' },
    { number: '111', status: 'Available', guest: null, checkIn: null, checkOut: null },
    { number: '112', status: 'Occupied', guest: 'Vikram Singh', checkIn: '18 Feb 2026', checkOut: '22 Feb 2026' },
  ]);

  const [bookings, setBookings] = useState([
    { id: 1, guestName: 'Rahul Sharma', room: '102', checkIn: '16 Feb 2026', checkOut: '18 Feb 2026', status: 'Occupied' },
    { id: 2, guestName: 'Priya Patel', room: '105', checkIn: '15 Feb 2026', checkOut: '20 Feb 2026', status: 'Occupied' },
    { id: 3, guestName: 'Amit Kumar', room: '107', checkIn: '17 Feb 2026', checkOut: '19 Feb 2026', status: 'Occupied' },
  ]);

  const [modals, setModals] = useState({
    newBooking: false,
    expressCheckIn: false,
    checkOut: false,
    nightAudit: false,
    extend: false,
    shiftRoom: false,
  });

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Calculate summary statistics
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(r => r.status === 'Available').length;
  const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
  const cleaningRooms = rooms.filter(r => r.status === 'Cleaning').length;

  const openModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
    setSelectedBooking(null);
    setSelectedRoom(null);
  };

  const handleNewBooking = (formData) => {
    const newBooking = {
      id: bookings.length + 1,
      guestName: formData.guestName,
      room: formData.room,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      status: 'Occupied',
    };

    setBookings(prev => [...prev, newBooking]);
    
    // Update room status
    setRooms(prev => prev.map(room => 
      room.number === formData.room 
        ? { ...room, status: 'Occupied', guest: formData.guestName, checkIn: formData.checkIn, checkOut: formData.checkOut }
        : room
    ));

    alert(`Booking created for ${formData.guestName} in Room ${formData.room}`);
    closeModal('newBooking');
  };

  const handleExpressCheckIn = (formData) => {
    handleNewBooking(formData);
    closeModal('expressCheckIn');
  };

  const handleCheckOut = (booking) => {
    if (window.confirm(`Check out ${booking.guestName} from Room ${booking.room}?`)) {
      setBookings(prev => prev.filter(b => b.id !== booking.id));
      setRooms(prev => prev.map(room => 
        room.number === booking.room 
          ? { ...room, status: 'Cleaning', guest: null, checkIn: null, checkOut: null }
          : room
      ));
      alert(`${booking.guestName} checked out successfully`);
      closeModal('checkOut');
    }
  };

  const handleNightAudit = () => {
    if (window.confirm('Run Night Audit? This will process all check-ins and check-outs for today.')) {
      alert('Night Audit completed successfully!');
      closeModal('nightAudit');
    }
  };

  const handleExtend = (booking) => {
    setSelectedBooking(booking);
    openModal('extend');
  };

  const handleExtendSubmit = (formData) => {
    setBookings(prev => prev.map(b => 
      b.id === selectedBooking.id 
        ? { ...b, checkOut: formData.checkOut }
        : b
    ));
    
    setRooms(prev => prev.map(room => 
      room.number === selectedBooking.room 
        ? { ...room, checkOut: formData.checkOut }
        : room
    ));

    alert(`Booking extended for ${selectedBooking.guestName}`);
    closeModal('extend');
  };

  const handleShiftRoom = (booking) => {
    setSelectedBooking(booking);
    openModal('shiftRoom');
  };

  const handleShiftRoomSubmit = (formData) => {
    // Update old room to available
    setRooms(prev => prev.map(room => 
      room.number === selectedBooking.room 
        ? { ...room, status: 'Cleaning', guest: null, checkIn: null, checkOut: null }
        : room
    ));

    // Update new room to occupied
    setRooms(prev => prev.map(room => 
      room.number === formData.room 
        ? { ...room, status: 'Occupied', guest: selectedBooking.guestName, checkIn: selectedBooking.checkIn, checkOut: selectedBooking.checkOut }
        : room
    ));

    // Update booking
    setBookings(prev => prev.map(b => 
      b.id === selectedBooking.id 
        ? { ...b, room: formData.room }
        : b
    ));

    alert(`${selectedBooking.guestName} shifted to Room ${formData.room}`);
    closeModal('shiftRoom');
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const handleRoomCheckIn = (room) => {
    setSelectedRoom(room);
    openModal('expressCheckIn');
  };

  const handleRoomCheckOut = (room) => {
    const booking = bookings.find(b => b.room === room.number);
    if (booking) {
      handleCheckOut(booking);
    }
  };

  const handleMarkCleaning = (room) => {
    setRooms(prev => prev.map(r => 
      r.number === room.number 
        ? { ...r, status: 'Cleaning', guest: null, checkIn: null, checkOut: null }
        : r
    ));
    
    setBookings(prev => prev.filter(b => b.room !== room.number));
    alert(`Room ${room.number} marked for cleaning`);
  };

  const handleMarkAvailable = (room) => {
    setRooms(prev => prev.map(r => 
      r.number === room.number 
        ? { ...r, status: 'Available' }
        : r
    ));
    alert(`Room ${room.number} is now available`);
  };

  return (
    
     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 p-6">
      {/* Page Title */}
      <h1 className="text-amber-50 font-bold mb-10 w-full">Hotel Management</h1>

      {/* Top Action Buttons */}
      <div className="action-buttons justify-between ">
      <button 
  className="h-12 w-60 bg-gradient-to-r from-purple-600 to-blue-400 
             text-white rounded-full"
  onClick={() => openModal('newBooking')}
>
  + New Booking
</button>
        <button 
          className="h-12 w-60 bg-gradient-to-r from-green-100 to-pink-500 
             text-white rounded-full"
          onClick={() => openModal('expressCheckIn')}
        >
          Express Check-In
        </button>

        <button 
          className="h-12 w-60 bg-gradient-to-r from-yellow-100 to-pink-500 
             text-white rounded-full"
          onClick={() => {
            if (bookings.length > 0) {
              setSelectedBooking(bookings[0]);
              openModal('checkOut');
            } else {
              alert('No active bookings to check out');
            }
          }}
        >
          Check-Out
        </button>

        <button 
          className="h-12 w-60 bg-gradient-to-r from-red-300 to-pink-600 
             text-white rounded-full"
          onClick={() => openModal('nightAudit')}
        >
          Night Audit
        </button>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <SummaryCard 
          label="Total Rooms" 
          value={totalRooms}
          onClick={() => alert(`Total Rooms: ${totalRooms}`)}
        />
        <SummaryCard 
          label="Available" 
          value={availableRooms}
          color="green"
          bgColor="green"
          onClick={() => alert(`Available Rooms: ${availableRooms}`)}
        />
        <SummaryCard 
          label="Occupied" 
          value={occupiedRooms}
          color="red"
          bgColor="red"
          onClick={() => alert(`Occupied Rooms: ${occupiedRooms}`)}
        />
        <SummaryCard 
          label="Cleaning" 
          value={cleaningRooms}
          color="yellow"
          bgColor="yellow"
          onClick={() => alert(`Rooms in Cleaning: ${cleaningRooms}`)}
        />
      </div>

      {/* Room Grid */}
      <h2 className="section-title">Room Status</h2>

      <div className="room-grid">
        {rooms.map((room) => (
          <RoomCard
            key={room.number}
            room={room}
            onRoomClick={handleRoomClick}
            onCheckIn={handleRoomCheckIn}
            onCheckOut={handleRoomCheckOut}
            onMarkCleaning={handleMarkCleaning}
            onMarkAvailable={handleMarkAvailable}
          />
        ))}
      </div>

      {/* Booking Table */}
      <div className="w-full max-w-6xl
                bg-white/10
                backdrop-blur-xl
                border border-white/20
                rounded-2xl
                shadow-2xl
                p-6
                transition duration-300">

  <h2 className="text-2xl font-semibold text-white mb-6">
    Active Bookings
  </h2>

  <div className="overflow-x-auto">
    <table className="min-w-full text-sm text-gray-200">
      
      <thead className="border-b border-white/20 text-gray-300 uppercase">
        <tr>
          <th className="px-4 py-3 text-left">Guest Name</th>
          <th className="px-4 py-3 text-left">Room</th>
          <th className="px-4 py-3 text-left">Check-In</th>
          <th className="px-4 py-3 text-left">Check-Out</th>
          <th className="px-4 py-3 text-left">Status</th>
          <th className="px-4 py-3 text-left">Action</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-white/10 gradiendt-to-r from-green-300">
        {bookings.map((booking) => (
          <BookingRow
            key={booking.id}
            booking={booking}
            onExtend={handleExtend}
            onShiftRoom={handleShiftRoom}
            onCheckOut={handleCheckOut}
          />
        ))}
      </tbody>

    </table>
  </div>
</div>

      {/* Modals */}
      <Modal 
        isOpen={modals.newBooking} 
        onClose={() => closeModal('newBooking')}
        title="New Booking"
      >
        <BookingForm
          onSubmit={handleNewBooking}
          onCancel={() => closeModal('newBooking')}
        />
      </Modal>

      <Modal 
        isOpen={modals.expressCheckIn} 
        onClose={() => closeModal('expressCheckIn')}
        title="Express Check-In"
      >
        <BookingForm
          onSubmit={handleExpressCheckIn}
          onCancel={() => closeModal('expressCheckIn')}
          initialData={selectedRoom ? { room: selectedRoom.number } : {}}
        />
      </Modal>

      <Modal 
        isOpen={modals.checkOut} 
        onClose={() => closeModal('checkOut')}
        title="Check-Out"
      >
        {selectedBooking && (
          <div>
            <p>Guest: <strong>{selectedBooking.guestName}</strong></p>
            <p>Room: <strong>{selectedBooking.room}</strong></p>
            <p>Check-In: <strong>{selectedBooking.checkIn}</strong></p>
            <p>Check-Out: <strong>{selectedBooking.checkOut}</strong></p>
            <div className="form-actions" style={{ marginTop: '20px' }}>
              <button className="btn-cancel" onClick={() => closeModal('checkOut')}>
                Cancel
              </button>
              <button 
                className="btn-submit" 
                onClick={() => handleCheckOut(selectedBooking)}
              >
                Confirm Check-Out
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal 
        isOpen={modals.nightAudit} 
        onClose={() => closeModal('nightAudit')}
        title="Night Audit"
      >
        <div>
          <p>This will process all check-ins and check-outs for today.</p>
          <p><strong>Summary:</strong></p>
          <ul>
            <li>Total Rooms: {totalRooms}</li>
            <li>Occupied: {occupiedRooms}</li>
            <li>Available: {availableRooms}</li>
            <li>Cleaning: {cleaningRooms}</li>
          </ul>
          <div className="form-actions" style={{ marginTop: '20px' }}>
            <button className="btn-cancel" onClick={() => closeModal('nightAudit')}>
              Cancel
            </button>
            <button className="btn-submit" onClick={handleNightAudit}>
              Run Night Audit
            </button>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={modals.extend} 
        onClose={() => closeModal('extend')}
        title="Extend Booking"
      >
        {selectedBooking && (
          <BookingForm
            onSubmit={handleExtendSubmit}
            onCancel={() => closeModal('extend')}
            initialData={{
              guestName: selectedBooking.guestName,
              room: selectedBooking.room,
              checkIn: selectedBooking.checkIn,
              checkOut: selectedBooking.checkOut,
            }}
          />
        )}
      </Modal>

      <Modal 
        isOpen={modals.shiftRoom} 
        onClose={() => closeModal('shiftRoom')}
        title="Shift Room"
      >
        {selectedBooking && (
          <BookingForm
            onSubmit={handleShiftRoomSubmit}
            onCancel={() => closeModal('shiftRoom')}
            initialData={{
              guestName: selectedBooking.guestName,
              room: selectedBooking.room,
              checkIn: selectedBooking.checkIn,
              checkOut: selectedBooking.checkOut,
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default Hotel;
