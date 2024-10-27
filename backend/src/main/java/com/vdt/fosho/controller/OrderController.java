package com.vdt.fosho.controller;

import com.vdt.fosho.dto.PageResponse;
import com.vdt.fosho.dto.request.OrderRequestDTO;
import com.vdt.fosho.dto.response.OrderResponseDTO;
import com.vdt.fosho.entity.User;
import com.vdt.fosho.service.OrderService;
import com.vdt.fosho.utils.exceptions.ForbiddenException;
import com.vdt.fosho.utils.JSendResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/restaurants/{restaurant_id}/orders")
    @ResponseBody
    public JSendResponse getByRestaurantId(
            @PathVariable("restaurant_id") Long restaurantId,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "10") int size,
            @RequestParam(value = "status", defaultValue = "PENDING") String status
    ) {
        PageResponse<OrderResponseDTO> orders = orderService
                .getByRestaurantIdAndStatus(restaurantId, status.toUpperCase(), page-1, size);

        return JSendResponse.success(Map.of(
                "total", orders.getTotal(),
                "page", page,
                "orders", orders.getData()
        ));
    }


    @PostMapping("/restaurants/{restaurant_id}/orders")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public JSendResponse create(
            @RequestBody  @Valid OrderRequestDTO orderDTO,
            @PathVariable("restaurant_id") Long restaurantId
    ) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        OrderResponseDTO order = orderService.create(orderDTO, restaurantId, user.getId());
        return JSendResponse.success(Map.of(
                "order", order
        ));
    }


    @PatchMapping("/restaurants/{restaurant_id}/orders/{order_id}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public JSendResponse updateStatus(
            @PathVariable("order_id") Long orderId,
            @PathVariable("restaurant_id") Long restaurantId,
            @RequestParam(value = "status") String status
    ) {
        OrderResponseDTO order = orderService.updateStatus(orderId, status.toUpperCase(), restaurantId);
        return JSendResponse.success(Map.of(
                "order", order
        ));
    }

    @GetMapping("/users/{user_id}/orders")
    @ResponseBody
    public JSendResponse getByUserId(
            @PathVariable("user_id") Long userId,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "10") int size,
            @RequestParam(value = "status", defaultValue = "PENDING") String status

    ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        if (!user.getId().equals(userId)) {
            throw new ForbiddenException("Cannot access other user's orders");
        }

        PageResponse<OrderResponseDTO> orders = orderService
                .getByUserIdAndStatus(userId, status.toUpperCase(), page-1, size);
        return JSendResponse.success(Map.of(
                "total", orders.getTotal(),
                "page", page,
                "orders", orders.getData()
        ));
    }

}
