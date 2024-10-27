package com.vdt.fosho.controller;

import com.vdt.fosho.dto.request.ShippingLocationRequestDTO;
import com.vdt.fosho.dto.response.ShippingLocationResponseDTO;
import com.vdt.fosho.entity.User;
import com.vdt.fosho.service.ShippingLocationService;
import com.vdt.fosho.utils.JSendResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@AllArgsConstructor
public class ShippingLocationController {

    private final ShippingLocationService shippingLocationService;

    @PostMapping("/locations")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public JSendResponse addShippingAddress(
            @Valid @RequestBody ShippingLocationRequestDTO shippingLocationDTO
    ) {
        User user = (User)  SecurityContextHolder.getContext().getAuthentication().getPrincipal();;
        ShippingLocationResponseDTO location = this.shippingLocationService.create(user, shippingLocationDTO);

        return JSendResponse.success(Map.of(
                "location", location
        ));
    }
}
