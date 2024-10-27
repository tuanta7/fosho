package com.vdt.fosho.service.impl;

import com.vdt.fosho.dto.request.ShippingLocationRequestDTO;
import com.vdt.fosho.dto.response.ShippingLocationResponseDTO;
import com.vdt.fosho.entity.ShippingLocation;
import com.vdt.fosho.entity.User;
import com.vdt.fosho.repository.jpa.ShippingLocationRepository;
import com.vdt.fosho.service.ShippingLocationService;
import com.vdt.fosho.utils.GeoUtils;
import com.vdt.fosho.utils.exceptions.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShippingLocationServiceImpl implements ShippingLocationService {

    private final ShippingLocationRepository shippingLocationRepository;

    public List<ShippingLocationResponseDTO> getShippingAddressesByUserId(Long id) {
        List<ShippingLocation> shippingLocations = shippingLocationRepository.findByUserIdAndDeletedAtIsNull(id);
        return shippingLocations.stream().map(this::toDTO).toList();
    }

    public ShippingLocationResponseDTO create(User user, ShippingLocationRequestDTO shippingAddressDTO) {
        ShippingLocation shippingLocation = toEntity(shippingAddressDTO);
        shippingLocation.setUser(user);
        return toDTO(shippingLocationRepository.save(shippingLocation));
    }

    public ShippingLocation getByIdAndUserId(Long id, Long userId) {
        return shippingLocationRepository
                .findByIdAndUserIdAndDeletedAtIsNull(id, userId)
                .orElseThrow(() -> new BadRequestException("Shipping address not found"));
    }

    private ShippingLocationResponseDTO toDTO(ShippingLocation shippingLocation) {
        return ShippingLocationResponseDTO.builder()
                .address(shippingLocation.getAddress())
                .recipientName(shippingLocation.getRecipientName())
                .recipientPhone(shippingLocation.getRecipientPhone())
                .build();
    }

    private ShippingLocation toEntity(ShippingLocationRequestDTO shippingAddressDTO) {
        return ShippingLocation.builder()
                .address(shippingAddressDTO.getAddress())
                .coordinates(GeoUtils.createPoint(shippingAddressDTO.getLatitude(), shippingAddressDTO.getLongitude()))
                .build();
    }
}
