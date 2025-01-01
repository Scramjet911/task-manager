// src/components/TicketList/TicketList.tsx
import React from 'react';

import type { Ticket } from '../../services/tickets';

import TicketCard from './components/Ticket';

interface TicketListProps {
  tickets: Ticket[];
  onUpdate: (id: string, updates: Partial<Ticket>) => void;
  onDelete: (id: string) => void;
}

const TicketList: React.FC<TicketListProps> = ({
  tickets,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TicketList;

// https://tasks.zephix.org
