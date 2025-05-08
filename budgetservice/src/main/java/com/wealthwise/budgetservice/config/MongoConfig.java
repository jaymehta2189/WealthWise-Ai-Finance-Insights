//package com.spendingservice.wealthwise.config;
//
//import ch.qos.logback.core.pattern.Converter;
//import org.springframework.context.annotation.*;
//import org.springframework.data.convert.CustomConversions;
//import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
//import org.springframework.data.mongodb.core.convert.*;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Configuration
//public class MongoConfig extends AbstractMongoClientConfiguration {
//
//    @Autowired
//    private YearMonthToStringConverter ymToStr;
//
//    @Autowired
//    private StringToYearMonthConverter strToYm;
//
//    @Override
//    protected String getDatabaseName() {
//        return "Spend_analysis2";
//    }
//
//    @Override
//    @Bean
//    public MongoCustomConversions customConversions() {
//        List<Converter<?>> converters = new ArrayList<>();
//        // Add your custom converters here
//        return new MongoCustomConversions(converters);
//    }
//
//}

package com.wealthwise.budgetservice.config;

import com.mongodb.ConnectionString;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.*;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

import java.util.List;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;  // e.g., mongodb+srv://…/spend_analysis2

    private final YearMonthToStringConverter ymToStr;
    private final StringToYearMonthConverter strToYm;

    public MongoConfig(YearMonthToStringConverter ymToStr,
                       StringToYearMonthConverter strToYm) {
        this.ymToStr = ymToStr;
        this.strToYm = strToYm;
    }

    @Override
    protected String getDatabaseName() {
        // Extracts the DB name component from the connection string :contentReference[oaicite:1]{index=1}
        return new ConnectionString(mongoUri).getDatabase();
    }

    /**
     * Override the MongoClient to use your Atlas URI, avoiding localhost defaults.
     */
    @Bean
    @Override
    public MongoClient mongoClient() {
        // Creates the client with auth, replicaSet, readPreference, etc. from URI :contentReference[oaicite:2]{index=2}
        return MongoClients.create(new ConnectionString(mongoUri));
    }

    /**
     * Register custom converters for YearMonth <-> String mapping.
     */
    @Override
    @Bean
    public MongoCustomConversions customConversions() {
        // Adds both StringToYearMonth and YearMonthToString converters :contentReference[oaicite:3]{index=3}
        return new MongoCustomConversions(List.of(ymToStr, strToYm));
    }

    /**
     * Ensure the MappingMongoConverter picks up our custom conversions. (Optional)
     */
    @Bean
    @Override
    public MappingMongoConverter mappingMongoConverter(
            MongoDatabaseFactory factory,
            MongoCustomConversions conversions,
            MongoMappingContext context) {

        var dbRefResolver = new DefaultDbRefResolver(factory);
        var converter     = new MappingMongoConverter(dbRefResolver, context);
        converter.setCustomConversions(conversions);
        // Disable _class field if not needed:
        converter.setTypeMapper(new DefaultMongoTypeMapper(null));
        return converter;
    }
}
