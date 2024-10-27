package com.vdt.fosho.service;

import com.vdt.fosho.dto.request.LocationRequestDTO;
import com.vdt.fosho.dto.request.RestaurantRequestDTO;
import com.vdt.fosho.dto.response.LocationResponseDTO;
import com.vdt.fosho.dto.response.RestaurantResponseDTO;

import com.vdt.fosho.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface RestaurantService {

    List<RestaurantResponseDTO> getList(Long ownerId);

    RestaurantResponseDTO create(User user, RestaurantRequestDTO restaurantDTO);

    RestaurantResponseDTO getById(Long id);

    RestaurantResponseDTO update(Long id, RestaurantRequestDTO restaurantDTO);

    void delete(Long id);

    LocationResponseDTO updateLocation(Long id, LocationRequestDTO locationDTO);

    RestaurantResponseDTO updateLogo(Long id, String logoUrl, String logoPublicId);

    boolean existsByIdAndOwnerId(Long id, Long ownerId);
}
