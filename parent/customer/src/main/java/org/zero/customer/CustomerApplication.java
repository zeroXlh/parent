package org.zero.customer;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = { "org.zero.customer.service.mapper" }, lazyInitialization = "true")
public class CustomerApplication {
	public static void main(String[] args) throws Exception {
		SpringApplication.run(CustomerApplication.class, args);
	}

}
