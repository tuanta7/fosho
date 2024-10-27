import { InboxStackIcon } from "@heroicons/react/24/outline";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

import { BASE_URL } from "../utils/constant";
import useGlobal from "../hooks/useGlobal";

const Notification = () => {
  const queryClient = useQueryClient();
  const [connected, setConnected] = useState(false);
  const stompClientRef = useRef(null);
  const {
    info: { user },
    stompClient: stompClientGlobal,
  } = useGlobal();

  useEffect(() => {
    const onMessageReceived = (payload) => {
      const msg = JSON.parse(payload.body).message;
      queryClient.invalidateQueries(["notifications", user?.id]);
      toast.success(msg);
    };

    const socket = new SockJS(`${BASE_URL}/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        setConnected(true);
        stompClient.subscribe(
          `/user/${user?.email}/queue/notifications`,
          onMessageReceived
        );
        // Register the connected user
        stompClient.publish({
          destination: `/app/user.connect`,
          body: JSON.stringify("User Connected!"),
        });
      },
      onStompError: () => {
        console.error("Could not connect to WebSocket server.");
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;
    stompClientGlobal.current = stompClient;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        stompClientGlobal.current = null;
      }
    };
  }, [user, stompClientGlobal, queryClient]);

  // Test restaurant notification when user place an order
  const sendMessage = () => {
    if (stompClientRef.current && connected) {
      stompClientRef.current.publish({
        destination: `/app/notifications`,
        body: JSON.stringify({
          restaurant_id: 2,
          user_id: 2,
          from_user: true,
          message: `Đơn hàng mới từ ${user?.email}!`,
        }),
      });
    }
  };

  return (
    <button className="btn btn-ghost btn-circle btn-sm" onClick={sendMessage}>
      <InboxStackIcon className="w-5" />
    </button>
  );
};

export default Notification;
