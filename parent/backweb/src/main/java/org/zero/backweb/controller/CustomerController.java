package org.zero.backweb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zero.customer.model.Customer;
import org.zero.customer.service.CustomerService;

@RestController
public class CustomerController {
	@Autowired
	private CustomerService customerService;
	
	@GetMapping("/customer/get")
	public Customer get(Integer custId) {
		Customer selectByPrimary = customerService.selectByPrimary(custId);
		
		System.out.println(selectByPrimary);
		
		return selectByPrimary;
	}
}
