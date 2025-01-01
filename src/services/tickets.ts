import { supabase } from './supabaseClient';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: 'Pending' | 'In Progress' | 'Done';
  date: string; // Deadline
}

export const fetchTickets = async (): Promise<Ticket[]> => {
  const { data, error } = await supabase.from('tickets').select('*');
  if (error) throw new Error(error.message);
  return data || [];
};

export const createTicket = async (
  ticket: Omit<Ticket, 'id'>,
): Promise<Ticket> => {
  const { data, error } = await supabase
    .from('tickets')
    .insert(ticket)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const updateTicket = async (
  id: string,
  updates: Partial<Ticket>,
): Promise<Ticket> => {
  const { data, error } = await supabase
    .from('tickets')
    .update(updates)
    .eq('id', id)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const deleteTicket = async (id: string): Promise<void> => {
  const { error } = await supabase.from('tickets').delete().eq('id', id);
  if (error) throw new Error(error.message);
};

// export const subscribeToTickets = (callback: (tickets: Ticket[]) => void) => {
//   const subscription = supabase
//     .from('tickets')
//     .on('INSERT', (payload) => callback([payload.new]))
//     .on('UPDATE', (payload) => callback([payload.new]))
//     .on('DELETE', (payload) => callback([]))
//     .subscribe();

//   return () => supabase.removeSubscription(subscription);
// };
