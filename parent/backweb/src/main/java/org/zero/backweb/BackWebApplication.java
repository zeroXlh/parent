package org.zero.backweb;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"org.zero.customer.service","org.zero.backweb"})
@MapperScan(basePackages = {"org.zero.customer.service.mapper"})
public class BackWebApplication {
public static void main(String[] args) throws Exception {
	SpringApplication.run(BackWebApplication.class, args);
}

}
