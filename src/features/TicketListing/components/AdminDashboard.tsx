import React, { useCallback } from 'react';

import TicketList from '..';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  createNewTicket,
  deleteExistingTicket,
  updateExistingTicket,
} from '../../../redux/slices/ticketsSlice';
import type { RootState } from '../../../redux/store';
import type { Ticket } from '../../../services/tickets';

const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tickets, loading } = useAppSelector(
    (state: RootState) => state.tickets,
  );

  const handleCreate = useCallback(() => {
    const newTicket: Omit<Ticket, 'id'> = {
      title: 'New Ticket',
      description: 'This is a new ticket.',
      assignee: 'user@example.com',
      status: 'Pending',
      date: new Date().toISOString(),
    };
    dispatch(createNewTicket(newTicket));
  }, [dispatch]);

  const handleUpdate = useCallback(
    (id: string, updates: Partial<any>) => {
      dispatch(updateExistingTicket({ id, updates }));
    },
    [dispatch],
  );

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deleteExistingTicket(id));
    },
    [dispatch],
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <button
        onClick={handleCreate}
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Create New Ticket
      </button>
      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        <TicketList
          tickets={tickets}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
