package com.spendingservice.wealthwise.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;

@Component
public class StringToYearMonthConverter
        implements Converter<String, YearMonth> {
    private static final DateTimeFormatter FMT =
            DateTimeFormatter.ofPattern("yyyy-MM");

    @Override
    public YearMonth convert(String source) {
        return YearMonth.parse(source, FMT);
    }
}
