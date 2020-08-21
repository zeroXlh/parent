package org.zero.backweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class BackWebApplication {
public static void main(String[] args) throws Exception {
	SpringApplication.run(BackWebApplication.class, args);
}

}
