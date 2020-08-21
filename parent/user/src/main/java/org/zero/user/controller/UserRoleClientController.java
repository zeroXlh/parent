package org.zero.user.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.zero.component.web.ResponseCode;
import org.zero.component.web.ResponseData;
import org.zero.user.model.UUserRole;
import org.zero.user.model.UUserRoleVo;
import org.zero.user.service.UUserRoleService;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/userRole")
public class UserRoleClientController {

	private static Logger logger = LoggerFactory.getLogger(UserRoleClientController.class);

	@Autowired
	private UUserRoleService uUserRoleService;

	@PostMapping("/pageNonAuth")
	public PageInfo<UUserRoleVo> pageNonAuth(@RequestBody UUserRoleVo userRoleVo,
			@RequestParam("pageNum") Integer pageNum, @RequestParam("pageSize") Integer pageSize) {
		logger.info("分页用户未授权角色，参数：[{}]，[{}]，[{}]", userRoleVo, pageNum, pageSize);

		return uUserRoleService.pageNonAuth(userRoleVo, pageNum, pageSize);
	}

	@PostMapping("/pageAuth")
	public PageInfo<UUserRoleVo> pageAuth(@RequestBody UUserRoleVo userRoleVo, @RequestParam("pageNum") Integer pageNum,
			@RequestParam("pageSize") Integer pageSize) {
		logger.info("分页用户授权角色，参数：[{}]，[{}]，[{}]", userRoleVo, pageNum, pageSize);

		return uUserRoleService.pageAuth(userRoleVo, pageNum, pageSize);
	}

	@PostMapping(value = "/add")
	public ResponseData<String> add(@RequestBody UUserRole userRole) {
		logger.info("新增用户角色，参数：[{}]", userRole);
		ResponseData<String> resp = null;
		try {
			uUserRoleService.add(userRole);

			resp = new ResponseData<>(ResponseCode.SUCC, "SUCC");
		} catch (Exception e) {
			logger.error("新增用户角色失败，参数：[{}]", userRole, e);
			resp = new ResponseData<>(ResponseCode.FAIL, e.getMessage());
		}
		return resp;
	}

	@PostMapping(value = "/update")
	public ResponseData<String> update(@RequestBody UUserRole userRole) {
		logger.info("更新用户角色，参数：[{}]", userRole);
		ResponseData<String> resp = null;
		try {
			uUserRoleService.updateByPrimaryKeySelective(userRole);

			resp = new ResponseData<>(ResponseCode.SUCC, "SUCC");
		} catch (Exception e) {
			logger.error("更新用户角色失败，参数：[{}]", userRole, e);
			resp = new ResponseData<>(ResponseCode.FAIL, e.getMessage());
		}
		return resp;
	}

}
