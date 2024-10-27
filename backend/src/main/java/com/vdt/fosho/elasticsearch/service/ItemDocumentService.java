package com.vdt.fosho.elasticsearch.service;

import com.vdt.fosho.elasticsearch.document.ItemDocument;
import org.springframework.data.domain.Page;

public interface ItemDocumentService {

    boolean replicateData(String op, ItemDocument itemDocument);

    Page<ItemDocument> search(String search, int page, int size);
}
