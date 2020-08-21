package org.zero.backweb.controller.customer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zero.backweb.client.customer.CustAccountClient;
import org.zero.component.web.ResponseCode;
import org.zero.component.web.ResponseData;
import org.zero.customer.model.CCustAccount;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/hoper/backweb/custAccount")
public class CustAccountController {
	private static Logger logger = LoggerFactory.getLogger(CustAccountController.class);

	@Autowired
	private CustAccountClient custAccountClient;

	@GetMapping
	public ResponseData<PageInfo<CCustAccount>> page(CCustAccount custAccount, Integer pageNum, Integer pageSize) {
		logger.info("分页查找客户账户信息，参数：[{}]，[{}]，[{}]", custAccount, pageNum, pageSize);
		ResponseData<PageInfo<CCustAccount>> resp = null;
		try {
			PageInfo<CCustAccount> page = custAccountClient.page(custAccount, pageNum, pageSize);

			resp = new ResponseData<>(ResponseCode.SUCC, page);
		} catch (Exception e) {
			logger.error("分页查找客户账户信息失败，参数：[{}]，[{}]，[{}]", custAccount, pageNum, pageSize, e);
			resp = new ResponseData<>(ResponseCode.FAIL, e.getMessage());
		}
		return resp;
	}
}
