package com.vdt.fosho.elasticsearch.repository;

import com.vdt.fosho.elasticsearch.document.ItemDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ItemDocumentRepository extends ElasticsearchRepository<ItemDocument, Long> {

   @Query("{\"bool\": {\"must\": [{\"wildcard\": {\"name\": {\"value\": \"*?0*\", \"case_insensitive\": true}}}]}}")
   Page<ItemDocument> findByName(String name, Pageable pageable);
}
