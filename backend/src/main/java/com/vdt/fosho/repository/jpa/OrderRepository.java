package com.vdt.fosho.repository.jpa;

import com.vdt.fosho.entity.Order;

import com.vdt.fosho.entity.type.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Page<Order> findAllByCustomerIdAndStatusOrderByCreatedAtDesc(Long customerId, OrderStatus status, Pageable pageable);

    Page<Order> findAllByRestaurantIdAndStatusOrderByCreatedAtAsc(Long restaurantId, OrderStatus status, Pageable pageable);
}
