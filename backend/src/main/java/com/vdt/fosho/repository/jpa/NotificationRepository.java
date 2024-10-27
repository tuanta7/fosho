package com.vdt.fosho.repository.jpa;

import com.vdt.fosho.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByRestaurantIdOrderByTimestampDesc(Long restaurantId);

    Page<Notification> findByRestaurantIdAndFromUserIsTrueOrderByTimestampDesc(Long userId, Pageable pageable);

    List<Notification> findByUserIdOrderByTimestampDesc(Long userId);
}
