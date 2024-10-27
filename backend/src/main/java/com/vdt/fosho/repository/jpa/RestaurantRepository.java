package com.vdt.fosho.repository.jpa;

import com.vdt.fosho.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    List<Restaurant> findByOwnerId(Long ownerId);

    boolean existsByIdAndOwnerId(Long restaurantId, Long ownerId);

}
