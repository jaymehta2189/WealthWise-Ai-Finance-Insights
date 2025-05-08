package com.spendingservice.wealthwise.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;

@Component
public class YearMonthToStringConverter
        implements Converter<YearMonth, String> {
    private static final DateTimeFormatter FMT =
            DateTimeFormatter.ofPattern("yyyy-MM");

    @Override
    public String convert(YearMonth source) {
        return source.format(FMT);
    }
}
