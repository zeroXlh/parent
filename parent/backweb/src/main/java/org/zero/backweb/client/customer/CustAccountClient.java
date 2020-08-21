package org.zero.backweb.client.customer;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.zero.customer.model.CCustAccount;

import com.github.pagehelper.PageInfo;

@FeignClient(name = "customer", contextId = "cust-account-client")
@RequestMapping("/account")
public interface CustAccountClient {
	@PostMapping("/page")
	PageInfo<CCustAccount> page(@RequestBody CCustAccount custAccount, @RequestParam("pageNum") Integer pageNum,
			@RequestParam("pageSize") Integer pageSize);
}
