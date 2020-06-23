package org.zero.customer.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zero.customer.ResponseCode;
import org.zero.customer.ResponseData;
import org.zero.customer.model.CCustInfo;
import org.zero.customer.model.CCustInfoVo;
import org.zero.customer.service.CCustInfoService;

import com.github.pagehelper.PageInfo;

@RestController
public class CustomerController {

	private static Logger logger = LoggerFactory.getLogger(CustomerController.class);

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

	@CrossOrigin
	@GetMapping("/customer/page")
	public ResponseData<PageInfo<CCustInfoVo>> page(CCustInfoVo cCustInfoVo) {
		logger.info("分页客户信息，参数：[{}]", cCustInfoVo);
		// ResponseData<PageInfo<CCustInfoVo>> resp = null;
		try {
			
			PageInfo<CCustInfoVo> page = cCustInfoService.page(cCustInfoVo);

			return new ResponseData<>(ResponseCode.SUCC, null, page);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseData<>(ResponseCode.FAIL);
	}
}
