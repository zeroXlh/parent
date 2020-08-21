package org.zero.user.controller;

import java.util.List;

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
import org.zero.user.model.URoleAuth;
import org.zero.user.model.URoleAuthVo;
import org.zero.user.service.URoleAuthService;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/roleAuth")
public class RoleAuthClientController {
	private static Logger logger = LoggerFactory.getLogger(RoleAuthClientController.class);

	@Autowired
	private URoleAuthService uRoleAuthService;

	@PostMapping("/pageNonAuthMenu")
	public PageInfo<URoleAuthVo> pageNonAuthMenu(@RequestBody URoleAuthVo roleAuthVo,
			@RequestParam("pageNum") Integer pageNum, @RequestParam("pageSize") Integer pageSize) {
		logger.info("分页查找角色未授权菜单，参数：[{}]，[{}]，[{}]", roleAuthVo, pageNum, pageSize);

		return uRoleAuthService.pageNonAuthMenu(roleAuthVo, pageNum, pageSize);
	}

	@PostMapping("/pageAuthMenu")
	public PageInfo<URoleAuthVo> pageAuthMenu(@RequestBody URoleAuthVo roleAuthVo,
			@RequestParam("pageNum") Integer pageNum, @RequestParam("pageSize") Integer pageSize) {
		logger.info("分页查找角色已授权菜单，参数：[{}]，[{}]，[{}]", roleAuthVo, pageNum, pageSize);

		return uRoleAuthService.pageAuthMenu(roleAuthVo, pageNum, pageSize);
	}

	@PostMapping("/pageNonAuth")
	public PageInfo<URoleAuthVo> pageNonAuth(@RequestBody URoleAuthVo roleAuthVo,
			@RequestParam("pageNum") Integer pageNum, @RequestParam("pageSize") Integer pageSize) {
		logger.info("分页查找角色未授权操作，参数：[{}]，[{}]，[{}]", roleAuthVo, pageNum, pageSize);

		return uRoleAuthService.pageNonAuth(roleAuthVo, pageNum, pageSize);
	}

	@PostMapping("/pageAuth")
	public PageInfo<URoleAuthVo> pageAuth(@RequestBody URoleAuthVo roleAuthVo, @RequestParam("pageNum") Integer pageNum,
			@RequestParam("pageSize") Integer pageSize) {
		logger.info("分页查找角色已授权操作，参数：[{}]，[{}]，[{}]", roleAuthVo, pageNum, pageSize);

		return uRoleAuthService.pageAuth(roleAuthVo, pageNum, pageSize);
	}

	@PostMapping(value = "/add")
	public ResponseData<String> add(@RequestBody URoleAuth roleAuth) {
		logger.info("新增角色权限，参数：[{}]", roleAuth);
		ResponseData<String> resp = null;
		try {
			uRoleAuthService.add(roleAuth);

			resp = new ResponseData<>(ResponseCode.SUCC, "SUCC");
		} catch (Exception e) {
			logger.error("新增角色权限失败，参数：[{}]", roleAuth, e);
			resp = new ResponseData<>(ResponseCode.FAIL, e.getMessage());
		}
		return resp;
	}
	
	@PostMapping(value = "/addBatch")
	public ResponseData<String> addBatch(@RequestBody List<URoleAuth> list) {
		logger.info("批量新增角色权限，参数：[{}]", list);
		ResponseData<String> resp = null;
		try {
			uRoleAuthService.addBatch(list);
			
			resp = new ResponseData<>(ResponseCode.SUCC, "SUCC");
		} catch (Exception e) {
			logger.error("批量新增角色权限失败，参数：[{}]", list, e);
			resp = new ResponseData<>(ResponseCode.FAIL, e.getMessage());
		}
		return resp;
	}

	@PostMapping(value = "/update")
	public ResponseData<String> update(@RequestBody URoleAuth roleAuth) {
		logger.info("更新角色权限，参数：[{}]", roleAuth);
		ResponseData<String> resp = null;
		try {
			uRoleAuthService.updateByPrimaryKeySelective(roleAuth);

			resp = new ResponseData<>(ResponseCode.SUCC, "SUCC");
		} catch (Exception e) {
			logger.error("更新角色权限失败，参数：[{}]", roleAuth, e);
			resp = new ResponseData<>(ResponseCode.FAIL, e.getMessage());
		}
		return resp;
	}

}