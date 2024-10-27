package com.vdt.fosho.service;

import com.vdt.fosho.dto.request.ItemRequestDTO;
import com.vdt.fosho.dto.response.ItemResponseDTO;


import java.util.List;

public interface ItemService {

    List<ItemResponseDTO> getByRestaurantId(Long restaurantId);

    ItemResponseDTO create(Long restaurantId, ItemRequestDTO itemDTO);

    ItemResponseDTO getById(Long dishId);

    ItemResponseDTO update(Long itemId, ItemRequestDTO itemDTO);

    void delete(Long itemId);

    ItemResponseDTO updateThumbnail(Long itemId, String url, String publicId);
}
