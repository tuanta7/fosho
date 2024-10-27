package com.vdt.fosho.repository.jpa;

import com.vdt.fosho.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long>{

     List<Item> findByRestaurantId(Long restaurantId);

     Item getItemById(Long id);
}
