package com.vdt.fosho.service.impl;

import com.vdt.fosho.dto.PageResponse;
import com.vdt.fosho.dto.request.OrderRequestDTO;
import com.vdt.fosho.dto.response.OrderResponseDTO;
import com.vdt.fosho.entity.*;
import com.vdt.fosho.entity.type.OrderStatus;
import com.vdt.fosho.service.*;
import com.vdt.fosho.utils.exceptions.BadRequestException;
import com.vdt.fosho.repository.jpa.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartService cartService;
    private final ShippingLocationService shippingLocationService;
    private final ItemService itemService;


    public PageResponse<OrderResponseDTO> getByUserIdAndStatus(Long userId, String status, int page, int size) {
        Pageable pageable = Pageable.ofSize(size).withPage(page);
        Page<Order> orders = orderRepository
                .findAllByCustomerIdAndStatusOrderByCreatedAtDesc(userId, OrderStatus.valueOf(status), pageable);
        return  PageResponse.<OrderResponseDTO>builder().
                total(orders.getTotalElements()).
                page(page).
                data(orders.stream().map(this::toDTO).toList()).
                build();
    }

    public PageResponse<OrderResponseDTO> getByRestaurantIdAndStatus(Long restaurantId, String status, int page, int size) {
        Pageable pageable = Pageable.ofSize(size).withPage(page);
        Page<Order> orders = orderRepository
                .findAllByRestaurantIdAndStatusOrderByCreatedAtAsc(restaurantId, OrderStatus.valueOf(status), pageable);
        return  PageResponse.<OrderResponseDTO>builder().
                total(orders.getTotalElements()).
                page(page).
                data(orders.stream().map(this::toDTO).toList()).
                build();
    }


    // TODO: Implement locking mechanism to prevent race conditions
    @Transactional
    public OrderResponseDTO create(OrderRequestDTO orderDTO, Long restaurantId, Long userId) {
        List<LineItem> lineItems = cartService.getItems(orderDTO.getLineItemIDs());
        double totalPrice = 0.0;
        double totalDiscount = 0.0;

        ShippingLocation shippingLocation = this.shippingLocationService.getByIdAndUserId(
                orderDTO.getShippingLocationId(),
                userId
        );

        for (LineItem lineItem : lineItems) {
//            if (lineItem.getOrder() != null) {
//                throw new BadRequestException("Order item is already in an order");
//            }
//            if (!lineItem.getCustomer().getId().equals(userId)) {
//                throw new BadRequestException("Order item does not belong to user");
//            }
            if (!lineItem.getItem().getRestaurant().getId().equals(restaurantId)) {
                throw new BadRequestException("Order item does not belong to restaurant");
            }
            totalPrice += lineItem.getItem().getPrice() * lineItem.getQuantity();
            totalDiscount += lineItem.getItem().getDiscount() * lineItem.getQuantity();
        }

        Order order = Order.builder().
                createdAt(LocalDateTime.now()).
                status(OrderStatus.PENDING).
                //customer(lineItems.getFirst().getCustomer()).
                restaurant(lineItems.getFirst().getItem().getRestaurant()).
                totalPrice(totalPrice).
                totalDiscount(totalDiscount).
                shippingLocation(shippingLocation).
                shippingFee(30000).
                items(lineItems).
                build();

        //lineItems.forEach(orderItem -> orderItem.setOrder(order));
        cartService.saveAll(lineItems);

        return toDTO(orderRepository.save(order));
    }


    // TODO: Implement locking mechanism to prevent race conditions
    @Transactional
    public OrderResponseDTO updateStatus(Long orderId, String status, Long restaurantId){
        Order order = orderRepository.findById(orderId).orElseThrow(
                () -> new BadRequestException("Order not found")
        );

        if (!order.getRestaurant().getId().equals(restaurantId)) {
            throw new BadRequestException("Order does not belong to this restaurant");
        }

        for (LineItem it : order.getItems()) {
            Item item = it.getItem();
            if (!Objects.equals(item.getRestaurant().getId(), restaurantId)) {
                throw new BadRequestException("Order item does not belong to this restaurant");
            }

            if (item.getStock() < it.getQuantity()) {
                throw new BadRequestException("Not enough stock for item: " + item.getName());
            }

            if (status.equals("CANCELLED")) {
                item.setStock(item.getStock() + it.getQuantity());
                item.setSold(item.getSold() - it.getQuantity());
                //itemService.save(item);
            }
            else if(status.equals("CONFIRMED")) {
                item.setStock(item.getStock() - it.getQuantity());
                item.setSold(item.getSold() + it.getQuantity());
                //itemService.save(item);
            }
        }

        order.setStatus(OrderStatus.valueOf(status));
        return toDTO(orderRepository.save(order));

    }


    public OrderResponseDTO toDTO(Order order) {
        return OrderResponseDTO.builder().build();
    }

}
