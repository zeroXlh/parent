package org.zero.backweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@ComponentScan(basePackages = {"org.zero.customer.service","org.zero.backweb"})
//@MapperScan(basePackages = {"org.zero.customer.service.mapper"})
public class BackWebApplication {
public static void main(String[] args) throws Exception {
	SpringApplication.run(BackWebApplication.class, args);
}

}
