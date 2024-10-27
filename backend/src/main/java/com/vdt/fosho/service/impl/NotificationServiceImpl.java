package com.vdt.fosho.service.impl;


import com.vdt.fosho.dto.NotificationDTO;
import com.vdt.fosho.dto.PageResponse;
import com.vdt.fosho.entity.Notification;
import com.vdt.fosho.entity.Restaurant;
import com.vdt.fosho.entity.User;
import com.vdt.fosho.repository.jpa.NotificationRepository;
import com.vdt.fosho.repository.jpa.RestaurantRepository;
import com.vdt.fosho.repository.jpa.UserRepository;
import com.vdt.fosho.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;

    public Notification save(NotificationDTO notificationDTO) {
        Notification notification = toEntity(notificationDTO);
        return notificationRepository.save(notification);
    }

    public List<NotificationDTO> findNotificationsByUserId(Long userId){
        List<Notification> notifications = notificationRepository.findByUserIdOrderByTimestampDesc(userId);
        return toDTOList(notifications);
    }

    public PageResponse<NotificationDTO> findNotificationsByRestaurantId(Long restaurantId, int page, int size){
        Pageable pageable = Pageable.ofSize(size).withPage(page);
        Page<Notification> notifications = notificationRepository.findByRestaurantIdAndFromUserIsTrueOrderByTimestampDesc(
                restaurantId,
                pageable
        );
        return PageResponse.<NotificationDTO>builder()
                .data(toDTOList(notifications.getContent()))
                .total(notifications.getTotalPages())
                .page(page)
                .build();
    }

    private Notification toEntity(NotificationDTO notificationDTO) {
        User user = userRepository.findById(notificationDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Restaurant restaurant = restaurantRepository.findById(notificationDTO.getRestaurantId())
                .orElseThrow(() -> new IllegalArgumentException("Restaurant not found"));

        return Notification.builder()
                .message(notificationDTO.getMessage())
                .fromUser(notificationDTO.isFromUserToRestaurant())
                .user(user)
                .restaurant(restaurant)
                .timestamp(LocalDateTime.now())
                .build();
    }

    private NotificationDTO toDTO(Notification notification) {
        return NotificationDTO.builder()
                .id(notification.getId())
                .message(notification.getMessage())
                .seen(notification.isSeen())
                .user(notification.getUser().getUsername())
                .restaurant(notification.getRestaurant().getName())
                .timestamp(notification.getTimestamp())
                .fromUserToRestaurant(notification.isFromUser())
                .userId(notification.getUser().getId())
                .restaurantId(notification.getRestaurant().getId())
                .build();
    }

    private List<NotificationDTO> toDTOList(List<Notification> notifications) {
        return notifications.stream().map(this::toDTO).toList();
    }
}
