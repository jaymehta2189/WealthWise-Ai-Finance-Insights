package com.spendingservice.wealthwise;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.EnableKafkaStreams;

@EnableKafkaStreams
@SpringBootApplication
public class WealthwiseApplication {

	public static void main(String[] args) {
		SpringApplication.run(WealthwiseApplication.class, args);
	}

}
