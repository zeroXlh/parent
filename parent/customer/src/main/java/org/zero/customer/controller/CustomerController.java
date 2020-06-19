package org.zero.customer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zero.customer.model.CCustInfo;
import org.zero.customer.service.CCustInfoService;

@RestController
public class CustomerController {

	@Autowired
	private CCustInfoService cCustInfoService;

	@GetMapping("/customer")
	public Object customer(Integer custId) {

		try {
			CCustInfo cCustInfo = cCustInfoService.findByPrimaryKey(custId);
			return cCustInfo;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "fail";
	}
}
