package com.vdt.fosho.controller;

import com.vdt.fosho.dto.request.ItemRequestDTO;
import com.vdt.fosho.dto.response.ItemResponseDTO;
import com.vdt.fosho.elasticsearch.document.ItemDocument;
import com.vdt.fosho.elasticsearch.service.ItemDocumentService;
import com.vdt.fosho.service.CloudinaryService;
import com.vdt.fosho.service.RestaurantService;
import com.vdt.fosho.utils.exceptions.BadRequestException;
import com.vdt.fosho.service.ItemService;
import com.vdt.fosho.utils.JSendResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.*;


@AllArgsConstructor
@RestController
public class ItemController {

    ItemService itemService;
    ItemDocumentService itemDocumentService;
    CloudinaryService cloudinaryService;

    @GetMapping("/public/items")
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
        Page<ItemDocument> itemsPage = itemDocumentService.search(q, page-1, limit);

        return JSendResponse.success(Map.of(
                "total", itemsPage.getTotalPages(),
                "page", page,
                "items", itemsPage.getContent()
        ));
    }

    @GetMapping("/restaurants/{restaurant_id}/items")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public JSendResponse getByRestaurant(
            @PathVariable("restaurant_id") Long restaurantId
    ) {
        List<ItemResponseDTO> items = itemService.getByRestaurantId(restaurantId);
        return JSendResponse.success(Map.of(
                "items", items
        ));
    }

    @PostMapping("/restaurants/{restaurant_id}/items")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public JSendResponse create(
            @PathVariable("restaurant_id") Long restaurantId,
            @RequestBody @Valid ItemRequestDTO itemDTO
    ) {
        ItemResponseDTO newItem = itemService.create(restaurantId, itemDTO);
        return JSendResponse.success(Map.of(
                "item", newItem
        ));
    }

    @DeleteMapping("/restaurants/{restaurant_id}/items/{item_id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ResponseBody
    public JSendResponse delete(
            @PathVariable("item_id") Long itemId
    ) {
        itemService.delete(itemId);
        return JSendResponse.success(null);
    }

    @PatchMapping("/restaurants/{restaurant_id}/items/{item_id}/thumbnail")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public JSendResponse updateThumbnail(
            @PathVariable("item_id") Long itemId,
            @RequestParam MultipartFile image
    ) throws IOException {

        BufferedImage bi = ImageIO.read(image.getInputStream());
        if (bi == null) {
            throw new BadRequestException("Invalid image file");
        }
        Map result = cloudinaryService.upload(image);

        String imageIdToDelete = itemService.getById(itemId).getThumbnailPublicId();
        ItemResponseDTO updatedItem = itemService.updateThumbnail(
                itemId,
                result.get("url").toString(),
                result.get("public_id").toString()
        );
        if (imageIdToDelete != null) {
            cloudinaryService.delete(imageIdToDelete);
        }

        return JSendResponse.success(Map.of(
                "item", updatedItem
        ));
    }
}
