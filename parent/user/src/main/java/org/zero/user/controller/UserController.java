package org.zero.user.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.zero.component.web.ResponseCode;
import org.zero.component.web.ResponseData;
import org.zero.user.model.UMenuInfo;
import org.zero.user.model.UOperatePermission;
import org.zero.user.model.UUser;
import org.zero.user.service.UMenuInfoService;
import org.zero.user.service.UOperatePermissionService;
import org.zero.user.service.UUserService;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/user")
public class UserController {
	private static Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UUserService uUserService;
	@Autowired
	private UMenuInfoService uMenuInfoService;
	@Autowired
	private UOperatePermissionService uOperatePermissionService;

	@GetMapping(value = "/fetchUserByUserName1")
	public UUser fetchUserByUserName1(@RequestParam String userName) {
		logger.info("根据用户名获取用户，userName：[{}]", userName);
		try {
			return uUserService.findByUserName(userName);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}

	@GetMapping(value = "/findByPrimary")
	public UUser findByPrimary(Integer userId) {
		logger.info("根据primary查找用户，userId：[{}]", userId);
		return uUserService.findByPrimaryKey(userId);
	}
	
	@GetMapping(value = "/fetchUserByUserName/{userName}")
	public UUser fetchUserByUserName(@PathVariable String userName) {
		logger.info("根据用户名获取用户，userName：[{}]", userName);
		try {
			return uUserService.findByUserName(userName);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}

	@GetMapping(value = "/fetchMenu/{userId}")
	public List<UMenuInfo> fetchMenu(@PathVariable Integer userId) {
		logger.info("根据用户编号获取用户菜单，userId：[{}]", userId);
		try {
			return uMenuInfoService.findByUser(userId);

		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}

	@GetMapping(value = "/fetchOperates/{userId}")
	List<UOperatePermission> fetchOperates(@PathVariable Integer userId) {
		logger.info("根据用户编号获取用户权限，userId：[{}]", userId);
		try {
			return uOperatePermissionService.findByUser(userId);

		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}

	@PostMapping(value = "/page")
	public PageInfo<UUser> page(@RequestBody UUser user, Integer pageNum, Integer pageSize) {
		logger.info("分页用户，参数：[{}]，[{}]，[{}]", user, pageNum, pageSize);

		return uUserService.page(user, pageNum, pageSize);
	}

	@PostMapping(value = "/add")
	public ResponseData<String> add(@RequestBody UUser user) {
		logger.info("新增用户，参数：[{}]", user);
		ResponseData<String> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			uUserService.add(user);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
		} catch (Exception e) {
			logger.error("新增用户失败，参数：[{}]", user, e);
			resp.setMsg(e.getMessage());
		}
		return resp;
	}

	@PostMapping(value = "/update")
	public ResponseData<String> update(@RequestBody UUser user) {
		logger.info("更新用户，参数：[{}]", user);
		ResponseData<String> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			uUserService.updateByPrimaryKeySelective(user.getUserId(), user);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
		} catch (Exception e) {
			logger.error("更新用户失败，参数：[{}]", user, e);
			resp.setMsg(e.getMessage());
		}
		return resp;
	}

}
