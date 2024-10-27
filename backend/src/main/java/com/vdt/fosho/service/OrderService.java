package com.vdt.fosho.service;

import com.vdt.fosho.dto.PageResponse;
import com.vdt.fosho.dto.request.OrderRequestDTO;
import com.vdt.fosho.dto.response.OrderResponseDTO;


public interface OrderService {

    PageResponse<OrderResponseDTO> getByUserIdAndStatus(Long userId, String status, int page, int size);

    PageResponse<OrderResponseDTO> getByRestaurantIdAndStatus(Long restaurantId, String status, int page, int size);

    OrderResponseDTO create(OrderRequestDTO orderDTO, Long restaurantId, Long userId);

    OrderResponseDTO updateStatus(Long orderId, String status, Long restaurantId);
}
