package org.zero.backweb.controller.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zero.backweb.client.user.UserRoleClient;
import org.zero.component.web.ResponseCode;
import org.zero.component.web.ResponseData;
import org.zero.user.model.UUserRole;
import org.zero.user.model.UUserRoleVo;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/hoper/backweb/userRole")
public class UserRoleController {
	private static Logger logger = LoggerFactory.getLogger(UserRoleController.class);

	@Autowired
	private UserRoleClient userRoleClient;

	@GetMapping(value = "/pageNonAuth")
	public ResponseData<PageInfo<UUserRoleVo>> pageNonAuth(UUserRoleVo userRoleVo, Integer pageNum, Integer pageSize) {
		logger.info("分页用户未授权角色，参数：[{}]，[{}]，[{}]", userRoleVo, pageNum, pageSize);
		ResponseData<PageInfo<UUserRoleVo>> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			PageInfo<UUserRoleVo> info = userRoleClient.pageNonAuth(userRoleVo, pageNum, pageSize);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
			resp.setData(info);

		} catch (Exception e) {
			logger.error("分页用户未授权角色失败，参数：[{}]，[{}]，[{}]", userRoleVo, pageNum, pageSize, e);
			resp.setMsg(e.getMessage());
		}
		return resp;
	}

	@GetMapping(value = "/pageAuth")
	public ResponseData<PageInfo<UUserRoleVo>> pageAuth(UUserRoleVo userRoleVo, Integer pageNum, Integer pageSize) {
		logger.info("分页用户授权角色，参数：[{}]，[{}]，[{}]", userRoleVo, pageNum, pageSize);
		ResponseData<PageInfo<UUserRoleVo>> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			PageInfo<UUserRoleVo> info = userRoleClient.pageAuth(userRoleVo, pageNum, pageSize);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
			resp.setData(info);

		} catch (Exception e) {
			logger.error("分页用户授权角色失败，参数：[{}]，[{}]，[{}]", userRoleVo, pageNum, pageSize, e);
			resp.setMsg(e.getMessage());
		}
		return resp;
	}

	@PostMapping(value = "/add")
	public ResponseData<String> add(UUserRole userRole) {
		logger.info("用户授权角色，参数：[{}]", userRole);
		ResponseData<String> resp = null;
		try {
			return userRoleClient.add(userRole);
		} catch (Exception e) {
			logger.error("用户授权失败，参数：[{}]", userRole, e);
			resp = new ResponseData<>(ResponseCode.FAIL, e.getMessage());
		}
		return resp;
	}

	@PostMapping(value = "/update")
	public ResponseData<String> update(UUserRole userRole) {
		logger.info("修改用户角色，参数：[{}]", userRole);
		ResponseData<String> resp = null;
		try {
			return userRoleClient.update(userRole);
		} catch (Exception e) {
			logger.error("修改用户角色失败，参数：[{}]", userRole, e);
			resp = new ResponseData<>(ResponseCode.FAIL, e.getMessage());
		}
		return resp;
	}

}
