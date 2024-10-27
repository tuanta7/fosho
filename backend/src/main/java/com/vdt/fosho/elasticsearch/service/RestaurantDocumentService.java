package com.vdt.fosho.elasticsearch.service;

import com.vdt.fosho.elasticsearch.document.RestaurantDocument;
import org.springframework.data.domain.Page;

public interface RestaurantDocumentService {

    boolean replicateData(String op, RestaurantDocument restaurantDocument);

    Page<RestaurantDocument> search(String search, int page, int size);

}
