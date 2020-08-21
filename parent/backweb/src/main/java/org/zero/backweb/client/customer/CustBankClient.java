package org.zero.backweb.client.customer;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.zero.customer.model.CCustBankVo;

import com.github.pagehelper.PageInfo;

@FeignClient(name = "customer", contextId = "cust-bank-client")
@RequestMapping("/bank")
public interface CustBankClient {
	@PostMapping("/page")
	PageInfo<CCustBankVo> page(@RequestBody CCustBankVo custBankVo, @RequestParam("pageNum") Integer pageNum,
			@RequestParam("pageSize") Integer pageSize);
}
