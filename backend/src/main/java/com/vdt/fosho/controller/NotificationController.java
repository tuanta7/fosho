package com.vdt.fosho.controller;

import com.vdt.fosho.dto.NotificationDTO;
import com.vdt.fosho.dto.PageResponse;
import com.vdt.fosho.entity.Notification;
import com.vdt.fosho.entity.User;
import com.vdt.fosho.service.NotificationService;
import com.vdt.fosho.service.RestaurantService;
import com.vdt.fosho.utils.JSendResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final RestaurantService restaurantService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/notifications")
    public void processNotification(@Payload NotificationDTO notificationDTO) {
        Notification savedNotification = notificationService.save(notificationDTO);

        String receiver = savedNotification.isFromUser() ?
                savedNotification.getRestaurant().getId().toString() :  // when users place an order
                savedNotification.getUser().getUsername(); // when user's orders get updated

        // Queue: "anhtuan9702@gmai.com/queue/notifications" for users
        // or "1/queue/notifications" for restaurants
        simpMessagingTemplate.convertAndSendToUser(receiver, "/queue/notifications", notificationDTO);
    }

    @GetMapping("/notifications")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ResponseEntity<List<NotificationDTO>> getUserNotification() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        List<NotificationDTO> notifications = notificationService.findNotificationsByUserId(user.getId());
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/restaurants/{restaurant_id}/notifications")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public JSendResponse getRestaurantNotification(
            @PathVariable("restaurant_id") Long restaurantId,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {

        PageResponse<NotificationDTO> notifications = notificationService
                .findNotificationsByRestaurantId(restaurantId, page-1, size);
        return JSendResponse.success(Map.of(
                "notifications", notifications.getData(),
                "total", notifications.getTotal(),
                "page", page
        ));
    }
}
