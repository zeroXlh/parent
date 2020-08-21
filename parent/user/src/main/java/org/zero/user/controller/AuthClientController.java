package org.zero.user.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zero.user.model.UOperatePermission;
import org.zero.user.service.UOperatePermissionService;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/auth")
public class AuthClientController {

	private static Logger logger = LoggerFactory.getLogger(AuthClientController.class);

	@Autowired
	private UOperatePermissionService uOperatePermissionService;

	@GetMapping(value = "/page")
	public PageInfo<UOperatePermission> page(UOperatePermission operatePermission, Integer pageNum, Integer pageSize) {
		logger.info("分页授权操作权限，参数：[{}]，[{}]，[{}]", operatePermission, pageNum, pageSize);

		return uOperatePermissionService.page(operatePermission, pageNum, pageSize);
	}

	@GetMapping(value = "/fetchByPrimaryKey")
	public UOperatePermission fetchByPrimaryKey(String permissionCode) {
		logger.info("根据primary获取授权操作权限，参数：[{}]", permissionCode);

		return uOperatePermissionService.findByPrimaryKey(permissionCode);
	}

	@PostMapping(value = "/add")
	public int add(@RequestBody UOperatePermission operatePermission) {
		logger.info("新增授权操作权限，参数：[{}]", operatePermission);
		try {
			return uOperatePermissionService.add(operatePermission);
		} catch (Exception e) {
			logger.info("新增授权操作权限失败，参数：[{}]", operatePermission, e);
		}
		return 0;
	}

	@PostMapping(value = "/update")
	public int update(@RequestBody UOperatePermission operatePermission) {
		logger.info("更新授权操作权限，参数：[{}]", operatePermission);
		try {
			return uOperatePermissionService.updateByPrimaryKeySelective(operatePermission.getPermissionCode(),
					operatePermission);
		} catch (Exception e) {
			logger.info("更新授权操作权限失败，参数：[{}]", operatePermission, e);
		}
		return 0;
	}

}
