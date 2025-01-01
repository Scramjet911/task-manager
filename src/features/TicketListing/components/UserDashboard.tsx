import React, { useCallback } from 'react';

import TicketList from '..';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { updateExistingTicket } from '../../../redux/slices/ticketsSlice';
import type { RootState } from '../../../redux/store';

const UserDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tickets } = useAppSelector((state: RootState) => state.tickets);
  const { user } = useAppSelector((state: RootState) => state.auth);

  const userTickets = tickets.filter(
    (ticket) => ticket.assignee === user?.email,
  );

  const handleStatusUpdate = useCallback(
    (id: string) => {
      dispatch(updateExistingTicket({ id, updates: { status: 'Done' } }));
    },
    [dispatch],
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">User Dashboard</h1>
      <h2 className="text-lg mt-4">Today's Tickets</h2>
      <TicketList
        tickets={userTickets}
        onUpdate={handleStatusUpdate}
        onDelete={() => {}}
      />
    </div>
  );
};

export default UserDashboard;
