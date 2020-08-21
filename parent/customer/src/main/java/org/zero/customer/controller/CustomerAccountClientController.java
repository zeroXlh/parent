package org.zero.customer.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zero.component.web.ResponseCode;
import org.zero.component.web.ResponseData;
import org.zero.customer.model.CCustAccount;
import org.zero.customer.service.CCustAccountService;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/account")
public class CustomerAccountClientController {

	private static Logger logger = LoggerFactory.getLogger(CustomerAccountClientController.class);

	@Autowired
	private CCustAccountService cCustAccountService;

	@GetMapping("/findByPhone")
	public ResponseData<CCustAccount> findByPhone(String phoneNo) {
		logger.info("根据手机号查找客户账户信息，参数：[{}]", phoneNo);
		ResponseData<CCustAccount> resp = null;
		try {
			CCustAccount account = cCustAccountService.findByPhone(phoneNo);
			resp = new ResponseData<>(ResponseCode.SUCC, null, account);
		} catch (Exception e) {
			logger.error("根据手机号查找客户账户信息，参数：[{}]", phoneNo, e);
			resp = new ResponseData<>(ResponseCode.FAIL, e.getMessage());
		}
		return resp;
	}

	// @CrossOrigin
	@PostMapping("/page")
	public ResponseData<PageInfo<CCustAccount>> page(@RequestBody CCustAccount custAccount, Integer pageNum,
			Integer pageSize) {
		logger.info("分页客户账户信息，参数：[{}]，[{}]，[{}]", custAccount, pageNum, pageSize);
		ResponseData<PageInfo<CCustAccount>> resp = null;
		try {
			PageInfo<CCustAccount> page = cCustAccountService.page(custAccount, pageNum, pageSize);

			resp = new ResponseData<>(ResponseCode.SUCC, null, page);
		} catch (Exception e) {
			logger.error("分页客户账户信息失败，参数：[{}]", custAccount, e);
			resp = new ResponseData<>(ResponseCode.FAIL, e.getMessage());
		}
		return resp;
	}

	@PostMapping("/add")
	public ResponseData<String> add(@RequestBody CCustAccount custAccount) {
		logger.info("新增客户账户信息，参数：[{}]", custAccount);
		ResponseData<String> resp = null;
		try {
			cCustAccountService.add(custAccount);

			resp = new ResponseData<>(ResponseCode.SUCC, null, null);
		} catch (Exception e) {
			logger.error("新增客户账户信息失败，参数：[{}]", custAccount, e);
			resp = new ResponseData<>(ResponseCode.FAIL, e.getMessage());
		}
		return resp;
	}

}
