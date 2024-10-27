package com.vdt.fosho.service;

import com.vdt.fosho.dto.request.CartItemRequestDTO;
import com.vdt.fosho.dto.response.CartResponseDTO;
import com.vdt.fosho.dto.response.LineItemResponseDTO;
import com.vdt.fosho.entity.LineItem;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartService {

    // Get all items in user cart
    List<CartResponseDTO> getByUserId(Long userId);

    // Add an order item to the cart
    LineItemResponseDTO addItem(Long userId, CartItemRequestDTO cartItemDTO);

    // Get order items by their ids (for checking out)
    List<LineItem> getItems(List<Long> itemIDs);

    // Save all order items with an order_id value (for creating an order)
    void saveAll(List<LineItem> lineItems);
}
