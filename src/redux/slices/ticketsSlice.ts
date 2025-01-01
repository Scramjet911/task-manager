// src/store/slices/ticketSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  fetchTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from '../../services/tickets';
import type { Ticket } from '../../services/tickets';

interface TicketState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
}

const initialState: TicketState = {
  tickets: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchAllTickets = createAsyncThunk(
  'tickets/fetchAll',
  async () => {
    return await fetchTickets();
  },
);

export const createNewTicket = createAsyncThunk(
  'tickets/create',
  async (ticket: Omit<Ticket, 'id'>) => {
    return await createTicket(ticket);
  },
);

export const updateExistingTicket = createAsyncThunk(
  'tickets/update',
  async ({ id, updates }: { id: string; updates: Partial<Ticket> }) => {
    return await updateTicket(id, updates);
  },
);

export const deleteExistingTicket = createAsyncThunk(
  'tickets/delete',
  async (id: string) => {
    await deleteTicket(id);
    return id;
  },
);

// Slice
const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTickets.fulfilled, (state, action) => {
        state.tickets = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tickets';
      })
      .addCase(createNewTicket.fulfilled, (state, action) => {
        state.tickets.push(action.payload);
      })
      .addCase(updateExistingTicket.fulfilled, (state, action) => {
        const index = state.tickets.findIndex(
          (ticket) => ticket.id === action.payload.id,
        );
        if (index >= 0) state.tickets[index] = action.payload;
      })
      .addCase(deleteExistingTicket.fulfilled, (state, action) => {
        state.tickets = state.tickets.filter(
          (ticket) => ticket.id !== action.payload,
        );
      });
  },
});

export default ticketSlice.reducer;
