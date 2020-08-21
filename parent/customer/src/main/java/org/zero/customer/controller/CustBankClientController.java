package org.zero.customer.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zero.component.web.ResponseCode;
import org.zero.component.web.ResponseData;
import org.zero.customer.model.CCustBankVo;
import org.zero.customer.service.CCustBankService;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/bank")
public class CustBankClientController {
	private static Logger logger = LoggerFactory.getLogger(CustBankClientController.class);

	@Autowired
	private CCustBankService cCustBankService;

	@PostMapping("/page")
	public ResponseData<PageInfo<CCustBankVo>> page(@RequestBody CCustBankVo custBankVo, Integer pageNum,
			Integer pageSize) {
		logger.info("分页客户银行卡信息，参数：[{}]，[{}]，[{}]", custBankVo, pageNum, pageSize);
		ResponseData<PageInfo<CCustBankVo>> resp = null;
		try {

			PageInfo<CCustBankVo> page = cCustBankService.page(custBankVo, pageNum, pageSize);

			resp = new ResponseData<>(ResponseCode.SUCC, page);
		} catch (Exception e) {
			logger.info("分页客户银行卡信息失败，参数：[{}]，[{}]，[{}]", custBankVo, pageNum, pageSize, e);
			resp = new ResponseData<>(ResponseCode.FAIL, e.getMessage());
		}
		return resp;
	}
}
