package com.vdt.fosho.controller;

import com.vdt.fosho.dto.request.LocationRequestDTO;
import com.vdt.fosho.dto.request.RestaurantRequestDTO;
import com.vdt.fosho.dto.response.LocationResponseDTO;
import com.vdt.fosho.dto.response.RestaurantResponseDTO;
import com.vdt.fosho.elasticsearch.document.RestaurantDocument;
import com.vdt.fosho.elasticsearch.service.RestaurantDocumentService;
import com.vdt.fosho.entity.User;
import com.vdt.fosho.service.CloudinaryService;
import com.vdt.fosho.utils.exceptions.BadRequestException;
import com.vdt.fosho.service.RestaurantService;
import com.vdt.fosho.utils.JSendResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Map;
import java.util.List;

@Slf4j
@RestController
@AllArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;
    private final RestaurantDocumentService restaurantDocumentService;
    private final CloudinaryService cloudinaryService;

    @GetMapping("/public/restaurants")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public JSendResponse search(
            @RequestParam(required = false,defaultValue = "") String q,
            @RequestParam(required = false, defaultValue = "10") int limit,
            @RequestParam(required = false, defaultValue = "1") int page
    ) {
        if (limit < 1 || page < 1) {
            throw new BadRequestException("Invalid limit or page");
        }
        Page<RestaurantDocument> restaurantsPage = restaurantDocumentService.search(q, page-1, limit);
        List<RestaurantDocument> restaurants = restaurantsPage.getContent();

        return JSendResponse.success(Map.of(
                "total", restaurantsPage.getTotalPages(),
                "page", page,
                "restaurants", restaurants)
        );
    }

    @GetMapping("/restaurants")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public JSendResponse getByOwner() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<RestaurantResponseDTO> restaurants = restaurantService.getList(user.getId());
        return JSendResponse.success(Map.of("restaurants", restaurants));
    }

    @PostMapping("/restaurants")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public JSendResponse create(
            @Valid @RequestBody RestaurantRequestDTO restaurantDTO
    ) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        RestaurantResponseDTO newRestaurant = restaurantService.create(user, restaurantDTO);
        return JSendResponse.success(Map.of("restaurant", newRestaurant));
    }

    @GetMapping("/restaurants/{restaurant_id}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public JSendResponse getById(
            @PathVariable("restaurant_id") Long restaurantId
    ) {
        RestaurantResponseDTO restaurant = restaurantService.getById(restaurantId);
        return JSendResponse.success(Map.of(
                "restaurant", restaurant
        ));
    }

    @PutMapping("/restaurants/{restaurant_id}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public JSendResponse update(
            @PathVariable("restaurant_id") Long id,
            @Valid @RequestBody RestaurantRequestDTO restaurantDTO
    ) {
        RestaurantResponseDTO updatedRestaurant = restaurantService.update(id, restaurantDTO);
        return JSendResponse.success(Map.of(
                "restaurant", updatedRestaurant)
        );
    }

    @DeleteMapping("/restaurants/{restaurant_id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ResponseBody
    public JSendResponse delete(
            @PathVariable("restaurant_id") Long id
    ) {
        restaurantService.delete(id);
        return JSendResponse.success(null);
    }

    @PatchMapping("/restaurants/{restaurant_id}/location")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public JSendResponse updateRestaurantCoordinates(
            @PathVariable("restaurant_id") Long id,
            @Valid @RequestBody LocationRequestDTO locationRequestDTO
    ) {
        LocationResponseDTO restaurant = restaurantService.updateLocation(id, locationRequestDTO);
        return JSendResponse.success(Map.of(
                "restaurant", restaurant)
        );
    }

    @PatchMapping("/restaurants/{restaurant_id}/logo")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public JSendResponse updateRestaurantLogo(
            @PathVariable("restaurant_id") Long id,
            @RequestParam MultipartFile logoFile
    ) throws IOException {

        BufferedImage bi = ImageIO.read(logoFile.getInputStream());
        if (bi == null) {
            throw new BadRequestException("Invalid image file");
        }
        Map result = cloudinaryService.upload(logoFile);

        RestaurantResponseDTO updatedRestaurant = restaurantService.updateLogo(
                id,
                result.get("url").toString(),
                result.get("public_id").toString()
        );

        String imageIdToDelete = restaurantService.getById(id).getLogoPublicId();
        if(imageIdToDelete != null){
            cloudinaryService.delete(imageIdToDelete);
        }

        return JSendResponse.success(Map.of(
                "restaurant", updatedRestaurant)
        );
    }

    @DeleteMapping("/restaurants/{restaurant_id}/logo")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ResponseBody
    public JSendResponse deleteRestaurantLogo(
            @PathVariable("restaurant_id") Long id
    ) throws IOException {

        RestaurantResponseDTO updatedRestaurant = restaurantService.updateLogo(id, null, null);
        cloudinaryService.delete(restaurantService.getById(id).getLogoPublicId());

        return JSendResponse.success(Map.of(
                "restaurant", updatedRestaurant)
        );
    }
}
