package com.vdt.fosho.service.impl;

import com.vdt.fosho.dto.request.ItemRequestDTO;
import com.vdt.fosho.dto.response.ItemResponseDTO;
import com.vdt.fosho.elasticsearch.document.ItemDocument;
import com.vdt.fosho.elasticsearch.repository.ItemDocumentRepository;
import com.vdt.fosho.elasticsearch.service.ItemDocumentService;
import com.vdt.fosho.entity.Item;
import com.vdt.fosho.entity.Restaurant;
import com.vdt.fosho.repository.jpa.ItemRepository;
import com.vdt.fosho.repository.jpa.RestaurantRepository;
import com.vdt.fosho.service.ItemService;
import com.vdt.fosho.utils.exceptions.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ItemServiceImpl implements ItemService, ItemDocumentService {

    private final ItemRepository itemRepository;
    private final RestaurantRepository restaurantRepository;
    private final ItemDocumentRepository itemDocumentRepository;

    public boolean replicateData(String op, ItemDocument itemDocument) {
        if(op.equals("c") || op.equals("u")) {
            System.out.println("Replicating data to Elasticsearch....");
            itemDocumentRepository.save(itemDocument);
            return true;
        } else if(op.equals("d")) {
            itemDocumentRepository.deleteById(itemDocument.getId());
        }
        return true;
    }


    public Page<ItemDocument> search(String search, int page, int size) {
        Pageable pageable = Pageable.ofSize(size).withPage(page);
        if (search.isEmpty()) {
            System.out.println("Searching all dishes in Elasticsearch");
            return itemDocumentRepository.findAll(pageable);
        }
        return itemDocumentRepository.findByName(search, pageable);  // Elasticsearch
    }


    public ItemResponseDTO getById(Long dishId) {
         Item item = itemRepository.findById(dishId)
               .orElseThrow(() -> new ResourceNotFoundException("Dish not found with id: " + dishId));
        return toDTO(item);
    }


    public ItemResponseDTO create(Long restaurantId, ItemRequestDTO itemDTO) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + restaurantId));

        Item item = toEntity(itemDTO);
        item.setRestaurant(restaurant);
        return toDTO(itemRepository.save(item));
    }


    public List<ItemResponseDTO> getByRestaurantId(Long restaurantId) {
        List<Item> items = itemRepository.findByRestaurantId(restaurantId);
        return items.stream().map(this::toDTO).toList();
    }


    public ItemResponseDTO update(Long itemId, ItemRequestDTO itemDTO) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Dish not found with id: " + itemId));

        // TODO: Update item fields
        return toDTO(itemRepository.save(item));
    }


    public void delete(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Dish not found with id: " + itemId));
        itemRepository.delete(item);
    }


    public ItemResponseDTO updateThumbnail(Long itemId, String url, String publicId) {
        Item dish = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Dish not found with id: " + itemId));

        dish.setThumbnailUrl(url);
        dish.setThumbnailPublicId(publicId);
        return toDTO(itemRepository.save(dish));
    }


    public ItemResponseDTO toDTO(Item dish) {
        return ItemResponseDTO.builder()
                .build();
    }


    public Item toEntity(ItemRequestDTO dishInput) {
        return Item.builder()
                .name(dishInput.getName())
                .description(dishInput.getDescription())
                .price(dishInput.getPrice())
                .discount(dishInput.getDiscount())
                .unit(dishInput.getUnit())
                .stock(dishInput.getStock())
                .build();
    }
}
