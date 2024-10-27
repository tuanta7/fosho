package com.vdt.fosho.entity;

import jakarta.persistence.*;
import lombok.experimental.FieldDefaults;


// TODO: Implement driver features
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Entity
public class Driver extends User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "license_plate")
    String licensePlate;

}
