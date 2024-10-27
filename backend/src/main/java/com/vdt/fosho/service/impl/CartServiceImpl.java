package com.vdt.fosho.service.impl;

import com.vdt.fosho.dto.request.CartItemRequestDTO;
import com.vdt.fosho.dto.response.CartResponseDTO;
import com.vdt.fosho.dto.response.LineItemResponseDTO;
import com.vdt.fosho.entity.Cart;
import com.vdt.fosho.entity.LineItem;
import com.vdt.fosho.repository.jpa.CartRepository;
import com.vdt.fosho.repository.jpa.ItemRepository;
import com.vdt.fosho.repository.jpa.LineItemRepository;
import com.vdt.fosho.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final LineItemRepository lineItemRepository;
    private final ItemRepository itemRepository;
    private final CartRepository cartRepository;

    public List<CartResponseDTO> getByUserId(Long userId) {
        List<Cart> items = cartRepository.findByUserId(userId);
        return items.stream().map(this::toDTO).toList();
    }


    public LineItemResponseDTO addItem(Long userId, CartItemRequestDTO cartItemDTO) {
        // Check if the item exists
//        Item item = itemRepository.getItemById(cartItemDTO.getDishId());
//
//        LineItem lineItem = orderItemRepository
//                .findByCustomerIdAndItemIdAndOrderIdIsNull(userId, item.getId())
//                .orElseGet(() -> {
//                    LineItem newItem = toEntity(cartItemDTO);
//                    newItem.setItem(item);
//                    return newItem;
//                });
//
//        lineItem.setQuantity(lineItem.getQuantity() + 1);
//        orderItemRepository.save(lineItem);

        return null;
    }


    public void saveAll(List<LineItem> lineItems) {
        lineItemRepository.saveAll(lineItems);
    }


    public List<LineItem> getItems(List<Long> itemIDs) {
        return lineItemRepository.findByIdIn(itemIDs);
    }


    public CartResponseDTO toDTO(Cart cart) {
        return CartResponseDTO.builder()
                .build();
    }

    public LineItem toEntity(CartItemRequestDTO orderItemDTO) {
        return LineItem.builder()
                .build();
    }
}
