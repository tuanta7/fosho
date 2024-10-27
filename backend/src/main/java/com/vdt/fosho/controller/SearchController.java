package com.vdt.fosho.controller;

import com.vdt.fosho.elasticsearch.document.ItemDocument;
import com.vdt.fosho.elasticsearch.document.RestaurantDocument;
import com.vdt.fosho.elasticsearch.service.ItemDocumentService;
import com.vdt.fosho.elasticsearch.service.RestaurantDocumentService;
import com.vdt.fosho.utils.JSendResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@AllArgsConstructor
public class SearchController {

    private final RestaurantDocumentService restaurantDocumentService;
    private final ItemDocumentService itemDocumentService;
    
    @GetMapping("/search")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public JSendResponse search(
            @RequestParam(defaultValue = "") String q,
            @RequestParam(defaultValue = "10") int limit
    ) {
        Page<ItemDocument> dishes = itemDocumentService.search(q, 0, limit);
        Page<RestaurantDocument> restaurants = restaurantDocumentService.search(q, 0, 10);
        return JSendResponse.success(Map.of(
                "dishes", dishes.getContent(),
                "restaurants", restaurants.getContent()
        ));
    }
}
