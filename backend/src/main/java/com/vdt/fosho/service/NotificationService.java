package com.vdt.fosho.service;


import com.vdt.fosho.dto.NotificationDTO;
import com.vdt.fosho.dto.PageResponse;
import com.vdt.fosho.entity.Notification;
import java.util.List;

public interface NotificationService  {

    Notification save(NotificationDTO notificationDTO);

    List<NotificationDTO> findNotificationsByUserId(Long userId);

    PageResponse<NotificationDTO> findNotificationsByRestaurantId(Long restaurantId, int page, int size);
}
