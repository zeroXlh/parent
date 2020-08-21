package org.zero.backweb.controller.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zero.backweb.client.user.RoleClient;
import org.zero.component.web.ResponseCode;
import org.zero.component.web.ResponseData;
import org.zero.user.model.URole;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/hoper/backweb/role")
public class RoleController {

	private static Logger logger = LoggerFactory.getLogger(RoleController.class);

	@Autowired
	private RoleClient roleClient;

	@GetMapping(value = "/page")
	public ResponseData<PageInfo<URole>> page(URole role, Integer pageNum, Integer pageSize) {
		logger.info("分页角色，参数：[{}]，[{}]，[{}]", role, pageNum, pageSize);
		ResponseData<PageInfo<URole>> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			PageInfo<URole> info = roleClient.page(role, pageNum, pageSize);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
			resp.setData(info);

		} catch (Exception e) {
			logger.error("分页角色失败，参数：[{}]，[{}]，[{}]", role, pageNum, pageSize, e);
			resp.setMsg("分页角色失败：" + e.getMessage());
		}
		return resp;
	}

	@GetMapping(value = "/fetchByPrimary")
	public ResponseData<URole> fetchByPrimary(String roleCode) {
		logger.info("根据primary获取角色，参数：[{}]", roleCode);
		ResponseData<URole> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			URole role = roleClient.fetchByPrimaryKey(roleCode);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
			resp.setData(role);
		} catch (Exception e) {
			logger.error("根据primary获取角色失败，参数：[{}]", roleCode, e);
			resp.setMsg("根据primary获取角色失败失败：" + e.getMessage());
		}
		return resp;
	}

	@PostMapping(value = "/add")
	public ResponseData<String> add(URole role) {
		logger.info("新增角色，参数：[{}]", role);
		ResponseData<String> resp = null;
		try {
			return roleClient.add(role);
		} catch (Exception e) {
			logger.error("新增角色失败，参数：[{}]", role, e);
			resp = new ResponseData<>(ResponseCode.FAIL, e.getMessage());
		}
		return resp;
	}

	@PostMapping(value = "/update")
	public ResponseData<String> update(URole role) {
		logger.info("更新角色，参数：[{}]", role);
		ResponseData<String> resp = null;
		try {
			return roleClient.update(role);
		} catch (Exception e) {
			logger.error("更新角色失败，参数：[{}]", role, e);
			resp = new ResponseData<>(ResponseCode.FAIL, e.getMessage());
		}
		return resp;
	}

}
