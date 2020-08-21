package org.zero.backweb.controller.customer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zero.backweb.client.customer.CustomerClient;
import org.zero.component.web.ResponseCode;
import org.zero.component.web.ResponseData;
import org.zero.customer.model.CCustInfoVo;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/hoper/backweb/cust")
public class CustInfoController {

	private static Logger logger = LoggerFactory.getLogger(CustInfoController.class);

	@Autowired
	private CustomerClient customerClient;

	@GetMapping
	public ResponseData<PageInfo<CCustInfoVo>> page(CCustInfoVo custInfoVo, Integer pageNum, Integer pageSize) {
		logger.info("分页查找客户信息，参数：[{}]，[{}]，[{}]", custInfoVo, pageNum, pageSize);
		ResponseData<PageInfo<CCustInfoVo>> resp = null;
		try {
			PageInfo<CCustInfoVo> page = customerClient.page(custInfoVo, pageNum, pageSize);

			resp = new ResponseData<>(ResponseCode.SUCC, page);
		} catch (Exception e) {
			logger.error("分页查找客户信息失败，参数：[{}]，[{}]，[{}]", custInfoVo, pageNum, pageSize, e);
			resp = new ResponseData<>(ResponseCode.FAIL, e.getMessage());
		}
		return resp;
	}

}
