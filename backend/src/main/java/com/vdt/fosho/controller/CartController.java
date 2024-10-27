package com.vdt.fosho.controller;

import com.vdt.fosho.dto.response.CartResponseDTO;
import com.vdt.fosho.entity.User;
import com.vdt.fosho.service.CartService;
import com.vdt.fosho.utils.JSendResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/carts")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public JSendResponse getCart() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<CartResponseDTO> carts = cartService.getByUserId(user.getId());
        return JSendResponse.success(Map.of("carts", carts));
    }

//    @PostMapping("/carts:add")
//    @ResponseStatus(HttpStatus.CREATED)
//    @ResponseBody
//    public JSendResponse<CartResponseDTO> addItem(
//            @RequestBody CartItemRequestDTO cartItemDTO
//    ) {
//        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        CartResponseDTO item = cartService.addItem(user.getId(), cartItemDTO);
//        return  JSendResponse.success(Map.of("new_item", item));
//    }
}
