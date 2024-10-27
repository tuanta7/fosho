package com.vdt.fosho.repository.jpa;

import com.vdt.fosho.entity.LineItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LineItemRepository extends JpaRepository<LineItem, Long>{

    // Find the order item to place an order
    List<LineItem> findByIdIn(List<Long> orderItemIds);
}
