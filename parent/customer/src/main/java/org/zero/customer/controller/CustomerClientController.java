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
import org.zero.customer.business.CustomerBusinessService;
import org.zero.customer.model.CCustInfo;
import org.zero.customer.model.CCustInfoVo;
import org.zero.customer.service.CCustInfoService;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/customer")
public class CustomerClientController {

	private static Logger logger = LoggerFactory.getLogger(CustomerClientController.class);

	@Autowired
	private CCustInfoService cCustInfoService;
	@Autowired
	private CustomerBusinessService customerBusinessService;

	@GetMapping("/findByPrimaryKey")
	public Object findByPrimaryKey(Integer custId) {
		logger.info("根据primary查找客户信息，参数：[{}]", custId);
		ResponseData<CCustInfo> resp = null;
		try {
			CCustInfo cCustInfo = cCustInfoService.findByPrimaryKey(custId);
			resp = new ResponseData<>(ResponseCode.SUCC, null, cCustInfo);
		} catch (Exception e) {
			logger.error("根据primary查找客户信息失败，参数：[{}]", custId, e);
			resp = new ResponseData<>(ResponseCode.FAIL, e.getMessage());
		}
		return resp;
	}

	// @CrossOrigin
	@PostMapping("/page")
	public ResponseData<PageInfo<CCustInfoVo>> page(@RequestBody CCustInfoVo cCustInfoVo, Integer pageNum,
			Integer pageSize) {
		logger.info("分页客户信息，参数：[{}]，[{}]，[{}]", cCustInfoVo, pageNum, pageSize);
		ResponseData<PageInfo<CCustInfoVo>> resp = null;
		try {

			PageInfo<CCustInfoVo> page = cCustInfoService.page(cCustInfoVo, pageNum, pageSize);

			resp = new ResponseData<>(ResponseCode.SUCC, page);
		} catch (Exception e) {
			logger.info("分页客户信息失败，参数：[{}]，[{}]，[{}]", cCustInfoVo, pageNum, pageSize, e);
			resp = new ResponseData<>(ResponseCode.FAIL, e.getMessage());
		}
		return resp;
	}

	@PostMapping("/certification")
	public ResponseData<String> certification(@RequestBody CCustInfoVo custInfoVo) {
		logger.info("客户实名认证请求，参数：[{}]", custInfoVo);
		ResponseData<String> resp = null;
		try {

			// 调用第三方接口实名认证
			// TODO
			// 保存数据，插入数据库

			customerBusinessService.certification(custInfoVo);

			resp = new ResponseData<>(ResponseCode.SUCC, null);
		} catch (Exception e) {
			logger.info("客户实名认证请求失败，参数：[{}]", custInfoVo, e);
			resp = new ResponseData<>(ResponseCode.FAIL, e.getMessage());
		}
		return resp;

	}
}
