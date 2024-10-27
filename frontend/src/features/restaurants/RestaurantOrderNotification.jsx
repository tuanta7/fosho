import PropTypes from "prop-types";
import { BellAlertIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";
import RestaurantNotificationList from "../notification/RestaurantNotificationList";

const RestaurantOrderNotification = ({ restaurantId }) => {
  const stompClientRef = useRef(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const onMessageReceived = (payload) => {
      const msg = JSON.parse(payload.body).message;
      toast.success("Thông báo đơn hàng: " + msg);
      queryClient.invalidateQueries(["restaurant-orders", restaurantId]);
    };

    const socket = new SockJS(`${BASE_URL}/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.subscribe(
          `/user/${restaurantId}/queue/notifications`,
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

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [restaurantId, queryClient]);

  return (
    <div className="dropdown dropdown-hover dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-sm bg-primary text-base-200 text-xs rounded-lg"
      >
        <BellAlertIcon className="w-4" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[99] menu p-2 shadow bg-base-100 rounded-box w-max"
      >
        <RestaurantNotificationList restaurantId={restaurantId} />
      </ul>
    </div>
  );
};

RestaurantOrderNotification.propTypes = {
  restaurantId: PropTypes.any.isRequired,
};

export default RestaurantOrderNotification;
