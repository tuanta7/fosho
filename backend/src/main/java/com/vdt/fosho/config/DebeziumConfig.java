package com.vdt.fosho.config;

import io.debezium.engine.DebeziumEngine;
import io.debezium.engine.RecordChangeEvent;
import org.apache.kafka.connect.source.SourceRecord;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DebeziumConfig {

    private DebeziumEngine<RecordChangeEvent<SourceRecord>> debeziumEngine;

    @Bean
    public io.debezium.config.Configuration customerConnector() {
        return io.debezium.config.Configuration.create()

                // Debezium properties
                .with("name", "custom-mariadb-connector")
                .with("connector.class", "io.debezium.connector.mysql.MySqlConnector")
                .with("offset.storage", "org.apache.kafka.connect.storage.FileOffsetBackingStore")
                .with("offset.storage.file.filename", "./debezium/offsets.dat")
                .with("offset.flush.interval.ms", 60000)

                // MariaDB properties
                .with("connector.adapter", "mariadb")
                .with("database.protocol", "jdbc:mariadb")
                .with("database.jdbc.driver", "org.mariadb.jdbc.Driver")
                .with("database.hostname", "localhost")
                .with("database.port", 3306)
                .with("database.user", "root")
                .with("database.password", "password")
                .with("database.dbname", "fosho")
                .with("database.ssl.mode", "disabled")
                .with("table.include.list", "fosho.restaurants,fosho.orders,fosho.dishes")

                // ???
                .with("include.schema.changes", "false")
                .with("database.server.id", 6000)
                .with("database.server.name", "fosho-connector")
                .with("database.history", "io.debezium.relational.history.FileDatabaseHistory")
                .with("database.history.file.filename", "./debezium/dbhistory.dat")

                // Kafka
                .with("topic.prefix", "vdt")
                .with("schema.history.internal", "io.debezium.storage.file.history.FileSchemaHistory")
                .with("schema.history.internal.file.filename", "./debezium/history.dat")
                .build();
    }
}
