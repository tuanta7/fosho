package com.vdt.fosho.repository.jpa;

import com.vdt.fosho.entity.ShippingLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShippingLocationRepository extends JpaRepository<ShippingLocation, Long> {

    List<ShippingLocation> findByUserIdAndDeletedAtIsNull(Long userId);

    Optional<ShippingLocation> findByIdAndUserIdAndDeletedAtIsNull(Long id, Long userId);
}
