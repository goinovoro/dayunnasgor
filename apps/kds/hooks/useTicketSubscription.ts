import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useTicketStore, Ticket } from "../store/useTicketStore";

export function useTicketSubscription() {
  const { fetchInitialTickets, receiveRealtimeTicket } = useTicketStore() as any;

  useEffect(() => {
    // Initial fetch
    if (fetchInitialTickets) fetchInitialTickets();

    // Subscribe to realtime changes on the tickets table
    const channel = supabase
      .channel("tickets_channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "tickets",
        },
        (payload) => {
          const t = payload.new;
          if (receiveRealtimeTicket) {
            receiveRealtimeTicket({
              id: t.id,
              orderType: t.order_type,
              status: t.status,
              items: typeof t.items === 'string' ? JSON.parse(t.items) : t.items,
              createdAt: t.created_at,
            });
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "tickets",
        },
        (payload) => {
          const t = payload.new;
          if (receiveRealtimeTicket) {
            receiveRealtimeTicket({
              id: t.id,
              orderType: t.order_type,
              status: t.status,
              items: typeof t.items === 'string' ? JSON.parse(t.items) : t.items,
              createdAt: t.created_at,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchInitialTickets, receiveRealtimeTicket]);
}
