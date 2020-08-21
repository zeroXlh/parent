package org.zero.backweb.controller.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zero.backweb.client.user.AuthClient;
import org.zero.component.web.ResponseCode;
import org.zero.component.web.ResponseData;
import org.zero.user.model.UOperatePermission;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/hoper/backweb/auth")
public class AuthController {
	private static Logger logger = LoggerFactory.getLogger(AuthController.class);
	
	@Autowired private AuthClient authClient;

	@GetMapping(value = "/page")
	public ResponseData<PageInfo<UOperatePermission>> page(UOperatePermission operatePermission, Integer pageNum, Integer pageSize) {
		logger.info("分页授权操作权限，参数：[{}]，[{}]，[{}]", operatePermission, pageNum, pageSize);
		ResponseData<PageInfo<UOperatePermission>> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			PageInfo<UOperatePermission> info = authClient.page(operatePermission, pageNum, pageSize);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
			resp.setData(info);

		} catch (Exception e) {
			logger.error("分页授权操作权限失败，参数：[{}]，[{}]，[{}]", operatePermission, pageNum, pageSize, e);
			resp.setMsg("分页授权操作权限失败：" + e.getMessage());
		}
		return resp;
	}
	
	@GetMapping(value = "/fetchAuth")
	public ResponseData<UOperatePermission> fetchAuth(String permissionCode) {
		logger.info("获取授权操作权限，参数：[{}]", permissionCode);
		ResponseData<UOperatePermission> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			UOperatePermission operatePermission = authClient.fetchByPrimaryKey(permissionCode);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
			resp.setData(operatePermission);

		} catch (Exception e) {
			logger.error("获取授权操作权限失败，参数：[{}]", permissionCode, e);
			resp.setMsg("获取授权操作权限失败：" + e.getMessage());
		}
		return resp;
	}

	@PostMapping(value = "/add")
	public ResponseData<String> add(UOperatePermission operatePermission) {
		logger.info("新增授权操作权限，参数：[{}]", operatePermission);
		ResponseData<String> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			authClient.add(operatePermission);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
		} catch (Exception e) {
			logger.error("新增授权操作权限失败，参数：[{}]", operatePermission, e);
			resp.setMsg("新增授权操作权限失败：" + e.getMessage());
		}
		return resp;
	}

	@PostMapping(value = "/update")
	public ResponseData<String> update(UOperatePermission operatePermission) {
		logger.info("更新授权操作权限，参数：[{}]", operatePermission);
		ResponseData<String> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			authClient.update(operatePermission);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
		} catch (Exception e) {
			logger.error("更新授权操作权限失败，参数：[{}]", operatePermission, e);
			resp.setMsg("更新授权操作权限失败：" + e.getMessage());
		}
		return resp;
	}

}
