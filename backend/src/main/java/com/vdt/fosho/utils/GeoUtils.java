package com.vdt.fosho.utils;

import com.vdt.fosho.dto.response.LocationResponseDTO;
import org.locationtech.jts.geom.*;
import org.locationtech.jts.geom.impl.CoordinateArraySequence;

public final class GeoUtils {

    private static final GeometryFactory GEOMETRY_FACTORY = new GeometryFactory(new PrecisionModel(), 4326);

    // Private constructor to prevent instantiation
    private GeoUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    public static Point createPoint(double latitude, double longitude) {
        Coordinate[] coordinates = new Coordinate[] { new Coordinate(longitude, latitude) };
        CoordinateSequence coordinateSequence = new CoordinateArraySequence(coordinates);
        return new Point(coordinateSequence, GEOMETRY_FACTORY);
    }

    public static LocationResponseDTO toLocationResponseDTO(Point point) {
        return LocationResponseDTO.builder()
                .latitude(point.getY())
                .longitude(point.getX())
                .build();
    }
}
