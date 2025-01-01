import React from 'react';

import type { Ticket } from '../../../services/tickets';

interface TicketCardProps {
  ticket: Ticket;
  onUpdate: (id: string, updates: Partial<Ticket>) => void;
  onDelete: (id: string) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-bold">{ticket.title}</h3>
      <p>{ticket.description}</p>
      <div className="mt-2">
        <span className="text-sm font-medium">Status: {ticket.status}</span>
      </div>
      <div className="mt-4 space-x-2">
        <button
          onClick={() => onUpdate(ticket.id, { status: 'Done' })}
          className="px-2 py-1 text-white bg-green-500 rounded"
        >
          Mark Done
        </button>
        <button
          onClick={() => onDelete(ticket.id)}
          className="px-2 py-1 text-white bg-red-500 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
