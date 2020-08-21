package org.zero.backweb.client.customer;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.zero.customer.model.CCustInfoVo;

import com.github.pagehelper.PageInfo;

@FeignClient(name = "customer", contextId = "cust-client")
@RequestMapping("/customer")
public interface CustomerClient {

	@PostMapping("/page")
	PageInfo<CCustInfoVo> page(@RequestBody CCustInfoVo custInfoVo, @RequestParam("pageNum") Integer pageNum,
			@RequestParam("pageSize") Integer pageSize);
	
	   
}
