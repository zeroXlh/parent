package org.zero.backweb.controller;

import java.util.List;

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
	
	@GetMapping("/customer/list")
	public List<Customer> list() {
//		Customer selectByPrimary = customerService.selectByPrimary(custId);
		
//		System.out.println(selectByPrimary);
		
		return null;
	}

	@GetMapping("/customer/add")
	public String add() {
		try {
			Customer customer = new Customer();
			customer.setCertNo("55666151");
			customer.setCustName("李四");
			System.out.println(customer);

			return "SUCC";
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "FAIL";
	}
	@GetMapping("/customer/update")
	public String update() {
		try {
			Customer customer = new Customer();
			customer.setCertNo("55666151");
			customer.setCustName("李四");
			System.out.println(customer);
			
			return "SUCC";
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "FAIL";
	}
}
