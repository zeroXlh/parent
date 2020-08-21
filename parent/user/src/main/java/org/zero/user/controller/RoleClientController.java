package org.zero.user.controller;

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
import org.zero.user.model.URole;
import org.zero.user.service.URoleService;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/role")
public class RoleClientController {

	private static Logger logger = LoggerFactory.getLogger(RoleClientController.class);

	@Autowired
	private URoleService uRoleService;

	@PostMapping(value = "/page")
	public PageInfo<URole> page(@RequestBody URole role, Integer pageNum, Integer pageSize) {
		logger.info("分页角色，参数：[{}]，[{}]，[{}]", role, pageNum, pageSize);

		return uRoleService.page(role, pageNum, pageSize);
	}

	@GetMapping(value = "/fetchByPrimaryKey")
	public URole fetchByPrimaryKey(String roleCode) {
		logger.info("根据primary获取角色，roleCode：[{}]", roleCode);
		return uRoleService.findByPrimaryKey(roleCode);
	}

	@PostMapping(value = "/add")
	public ResponseData<String> add(@RequestBody URole role) {
		logger.info("新增角色，参数：[{}]", role);
		ResponseData<String> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			uRoleService.add(role);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
		} catch (Exception e) {
			logger.error("新增角色失败，参数：[{}]", role, e);
			resp.setMsg("新增角色失败：" + e.getMessage());
		}
		return resp;
	}

	@PostMapping(value = "/update")
	public ResponseData<String> update(@RequestBody URole role) {
		logger.info("更新角色，参数：[{}]", role);
		ResponseData<String> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			uRoleService.updateByPrimaryKeySelective(role.getRoleCode(), role);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
		} catch (Exception e) {
			logger.error("更新角色失败，参数：[{}]", role, e);
			resp.setMsg("修改角色失败：" + e.getMessage());
		}
		return resp;
	}

}
