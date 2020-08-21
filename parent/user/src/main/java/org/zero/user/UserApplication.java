package org.zero.user;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@MapperScan(basePackages = { "org.zero.user.service.mapper" })
@EnableDiscoveryClient
public class UserApplication {
	public static void main(String[] args) throws Exception {
		SpringApplication.run(UserApplication.class, args);
	}

}
