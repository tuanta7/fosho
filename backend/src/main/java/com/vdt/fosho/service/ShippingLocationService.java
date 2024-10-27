package com.vdt.fosho.service;

import com.vdt.fosho.dto.request.ShippingLocationRequestDTO;
import com.vdt.fosho.dto.response.ShippingLocationResponseDTO;
import com.vdt.fosho.entity.ShippingLocation;
import com.vdt.fosho.entity.User;
import org.springframework.stereotype.Service;


@Service
public interface ShippingLocationService {

    ShippingLocation getByIdAndUserId(Long id, Long userId);

    ShippingLocationResponseDTO create(User user, ShippingLocationRequestDTO shippingAddressDTO);
}
