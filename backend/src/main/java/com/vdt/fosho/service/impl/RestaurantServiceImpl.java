package com.vdt.fosho.service.impl;

import com.vdt.fosho.dto.request.LocationRequestDTO;
import com.vdt.fosho.dto.request.RestaurantRequestDTO;
import com.vdt.fosho.dto.response.LocationResponseDTO;
import com.vdt.fosho.dto.response.RestaurantResponseDTO;
import com.vdt.fosho.elasticsearch.document.RestaurantDocument;
import com.vdt.fosho.elasticsearch.repository.RestaurantDocumentRepository;
import com.vdt.fosho.elasticsearch.service.RestaurantDocumentService;
import com.vdt.fosho.entity.Restaurant;
import com.vdt.fosho.entity.User;
import com.vdt.fosho.repository.jpa.RestaurantRepository;
import com.vdt.fosho.service.RestaurantService;
import com.vdt.fosho.utils.FieldPatch;
import com.vdt.fosho.utils.GeoUtils;
import com.vdt.fosho.utils.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class RestaurantServiceImpl implements RestaurantService, RestaurantDocumentService {

    private final RestaurantRepository restaurantRepository;
    private final RestaurantDocumentRepository restaurantDocumentRepository;

    public boolean existsByIdAndOwnerId(Long id, Long ownerId) {
        return restaurantRepository.existsByIdAndOwnerId(id, ownerId);
    }


    public List<RestaurantResponseDTO> getList(Long ownerId) {
        List<Restaurant> restaurants = restaurantRepository.findByOwnerId(ownerId);
        return restaurants.stream().map(this::toDTO).toList();
    }


    public RestaurantResponseDTO create(User user, RestaurantRequestDTO restaurantDTO) {
        Restaurant restaurant = toEntity(restaurantDTO);
        restaurant.setOwner(user);
        return toDTO(restaurantRepository.save(restaurant));
    }


    public RestaurantResponseDTO getById(Long id) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));
        return toDTO(restaurant);
    }


    public RestaurantResponseDTO update(Long id, RestaurantRequestDTO restaurantDTO) {
        Restaurant existingRestaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));

        // TODO: Implement patching mechanism
        FieldPatch.applyPatch(existingRestaurant, restaurantDTO, "location");
        return toDTO(restaurantRepository.save(existingRestaurant));
    }


    public void delete(Long id) {
        Restaurant existingRestaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));
        restaurantRepository.deleteById(existingRestaurant.getId());
    }


    public LocationResponseDTO updateLocation(Long id, LocationRequestDTO locationDTO) {
        Restaurant existingRestaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));

        existingRestaurant.setAddress(locationDTO.getAddress());
        existingRestaurant.setCoordinates(GeoUtils.createPoint(
                locationDTO.getLatitude(),
                locationDTO.getLongitude()
        ));
        restaurantRepository.save(existingRestaurant);

        return LocationResponseDTO.builder()
                .address(locationDTO.getAddress())
                .latitude(locationDTO.getLatitude())
                .longitude(locationDTO.getLongitude())
                .build();
    }


    public RestaurantResponseDTO updateLogo(Long id, String logoUrl, String logoPublicId) {
        Optional<Restaurant> result = restaurantRepository.findById(id);
        if (result.isEmpty()) {
            throw new ResourceNotFoundException("Restaurant not found with id: " + id);
        }
        Restaurant existingRestaurant = result.get();

        existingRestaurant.setLogoUrl(logoUrl);
        existingRestaurant.setLogoPublicId(logoPublicId);

        return toDTO(restaurantRepository.save(existingRestaurant));
    }


    private RestaurantResponseDTO toDTO(Restaurant restaurant) {
        return  RestaurantResponseDTO.builder()
                .id(restaurant.getId())
                .name(restaurant.getName())
                .phone(restaurant.getPhone())
                .isActive(restaurant.isActive())
                .openTime(restaurant.getOpenTime())
                .closeTime(restaurant.getCloseTime())
                .location(LocationResponseDTO.builder()
                        .address(restaurant.getAddress())
                        .latitude(restaurant.getCoordinates().getY())
                        .longitude(restaurant.getCoordinates().getX())
                        .build())
                .ownerId(restaurant.getOwner().getId())
                .build();
    }


    private Restaurant toEntity(RestaurantRequestDTO restaurantDTO) {
        return Restaurant.builder()
                .name(restaurantDTO.getName())
                .phone(restaurantDTO.getPhone())
                .openTime(restaurantDTO.getOpenTime())
                .closeTime(restaurantDTO.getCloseTime())
                .address(restaurantDTO.getLocation().getAddress())
                .coordinates(GeoUtils.createPoint(
                        restaurantDTO.getLocation().getLatitude(),
                        restaurantDTO.getLocation().getLongitude()
                ))
                .build();
    }


    // Elasticsearch Services
    public boolean replicateData(String op, RestaurantDocument restaurantDocument) {
        if(op.equals("c") || op.equals("u")) {
            System.out.println("Replicating data to Elasticsearch...");
            restaurantDocumentRepository.save(restaurantDocument);
        } else if(op.equals("d")) {
            restaurantDocumentRepository.deleteById(restaurantDocument.getId());
        }
        return true;
    }


    public Page<RestaurantDocument> search(String search, int page, int size) {
        Pageable pageable = Pageable.ofSize(size).withPage(page);
        if (search.isEmpty()) {
            System.out.println("Searching all restaurants in Elasticsearch");
            return restaurantDocumentRepository.findAll(pageable);
        }
        return restaurantDocumentRepository.findByName(search, pageable);
    }
}
