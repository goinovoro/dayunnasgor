import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export type OrderStatus = "RECEIVED" | "PREPPING" | "READY" | "COMPLETED";

export type TicketItem = {
  id: string;
  name: string;
  quantity: number;
  variation?: 'Goreng' | 'Rebus';
  completed?: boolean;
};

export type Ticket = {
  id: string;
  orderType: 'Makan ditempat' | 'Bawa Pulang';
  status: OrderStatus;
  items: TicketItem[];
  createdAt: string;
};

interface TicketStore {
  tickets: Ticket[];
  fetchInitialTickets: () => Promise<void>;
  receiveRealtimeTicket: (ticket: Ticket) => void;
  bumpTicket: (id: string, newStatus: OrderStatus) => Promise<void>;
  toggleItemComplete: (ticketId: string, itemId: string) => Promise<void>;
}

export const useTicketStore = create<TicketStore>((set, get) => ({
  tickets: [],
  fetchInitialTickets: async () => {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .neq('status', 'COMPLETED')
      .order('created_at', { ascending: true });

    if (!error && data) {
      // Map db fields to Ticket type
      const parsedTickets: Ticket[] = data.map(t => ({
        id: t.id,
        orderType: t.order_type as any,
        status: t.status as OrderStatus,
        items: typeof t.items === 'string' ? JSON.parse(t.items) : t.items,
        createdAt: t.created_at,
      }));
      set({ tickets: parsedTickets });
    }
  },
  receiveRealtimeTicket: (ticket) => set((state) => {
    // If ticket exists, update it, else append it (unless it's COMPLETED)
    const exists = state.tickets.find(t => t.id === ticket.id);
    if (ticket.status === 'COMPLETED') {
      return { tickets: state.tickets.filter(t => t.id !== ticket.id) };
    }
    
    if (exists) {
      return { tickets: state.tickets.map(t => t.id === ticket.id ? ticket : t) };
    }
    return { tickets: [...state.tickets, ticket] };
  }),
  bumpTicket: async (id, newStatus) => {
    // Optimistic update
    set((state) => ({
      tickets: state.tickets.map(t => t.id === id ? { ...t, status: newStatus } : t)
    }));

    // Update in Supabase
    await supabase.from('tickets').update({ status: newStatus }).eq('id', id);
  },
  toggleItemComplete: async (ticketId, itemId) => {
    // Optimistic update
    const state = get();
    const updatedTickets = state.tickets.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          items: t.items.map(item => item.id === itemId ? { ...item, completed: !item.completed } : item)
        };
      }
      return t;
    });
    set({ tickets: updatedTickets });

    // Update in Supabase
    const updatedTicket = updatedTickets.find(t => t.id === ticketId);
    if (updatedTicket) {
      await supabase.from('tickets').update({ items: updatedTicket.items }).eq('id', ticketId);
    }
  },
}));
