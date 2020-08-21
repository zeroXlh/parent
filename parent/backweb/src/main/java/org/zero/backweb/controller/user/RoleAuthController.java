package org.zero.backweb.controller.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zero.backweb.client.user.RoleAuthClient;
import org.zero.component.utils.StringUtils;
import org.zero.component.web.ResponseCode;
import org.zero.component.web.ResponseData;
import org.zero.user.model.URoleAuth;
import org.zero.user.model.URoleAuthVo;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/hoper/backweb/roleAuth")
public class RoleAuthController {
	private static Logger logger = LoggerFactory.getLogger(RoleAuthController.class);

	@Autowired
	private RoleAuthClient userRoleClient;

	@GetMapping(value = "/pageNonAuthMenu")
	public ResponseData<PageInfo<URoleAuthVo>> pageNonAuthMenu(URoleAuthVo roleAuthVo, Integer pageNum,
			Integer pageSize) {
		logger.info("分页角色未授权菜单，参数：[{}]，[{}]，[{}]", roleAuthVo, pageNum, pageSize);
		ResponseData<PageInfo<URoleAuthVo>> resp = new ResponseData<>(ResponseCode.FAIL);
		if (StringUtils.isEmpty(roleAuthVo.getRoleCode())) {
			resp.setMsg("roleCode不能为空");
			return resp;
		}
		try {
			PageInfo<URoleAuthVo> info = userRoleClient.pageNonAuthMenu(roleAuthVo, pageNum, pageSize);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
			resp.setData(info);

		} catch (Exception e) {
			logger.error("分页角色未授权菜单失败，参数：[{}]，[{}]，[{}]", roleAuthVo, pageNum, pageSize, e);
			resp.setMsg(e.getMessage());
		}
		return resp;
	}

	@GetMapping(value = "/pageAuthMenu")
	public ResponseData<PageInfo<URoleAuthVo>> pageAuthMenu(URoleAuthVo roleAuthVo, Integer pageNum, Integer pageSize) {
		logger.info("分页角色已授权菜单，参数：[{}]，[{}]，[{}]", roleAuthVo, pageNum, pageSize);
		ResponseData<PageInfo<URoleAuthVo>> resp = new ResponseData<>(ResponseCode.FAIL);
		if (StringUtils.isEmpty(roleAuthVo.getRoleCode())) {
			resp.setMsg("roleCode不能为空");
			return resp;
		}
		try {
			PageInfo<URoleAuthVo> info = userRoleClient.pageAuthMenu(roleAuthVo, pageNum, pageSize);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
			resp.setData(info);

		} catch (Exception e) {
			logger.error("分页角色已授权菜单失败，参数：[{}]，[{}]，[{}]", roleAuthVo, pageNum, pageSize, e);
			resp.setMsg(e.getMessage());
		}
		return resp;
	}

	@GetMapping(value = "/pageNonAuth")
	public ResponseData<PageInfo<URoleAuthVo>> pageNonAuth(URoleAuthVo roleAuthVo, Integer pageNum, Integer pageSize) {
		logger.info("分页角色未授权操作，参数：[{}]，[{}]，[{}]", roleAuthVo, pageNum, pageSize);
		ResponseData<PageInfo<URoleAuthVo>> resp = new ResponseData<>(ResponseCode.FAIL);
		if (StringUtils.isEmpty(roleAuthVo.getRoleCode())) {
			resp.setMsg("roleCode不能为空");
			return resp;
		}
		try {
			PageInfo<URoleAuthVo> info = userRoleClient.pageNonAuth(roleAuthVo, pageNum, pageSize);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
			resp.setData(info);

		} catch (Exception e) {
			logger.error("分页角色未授权操作失败，参数：[{}]，[{}]，[{}]", roleAuthVo, pageNum, pageSize, e);
			resp.setMsg(e.getMessage());
		}
		return resp;
	}

	@GetMapping(value = "/pageAuth")
	public ResponseData<PageInfo<URoleAuthVo>> pageAuth(URoleAuthVo roleAuthVo, Integer pageNum, Integer pageSize) {
		logger.info("分页角色已授权操作，参数：[{}]，[{}]，[{}]", roleAuthVo, pageNum, pageSize);
		ResponseData<PageInfo<URoleAuthVo>> resp = new ResponseData<>(ResponseCode.FAIL);
		if (StringUtils.isEmpty(roleAuthVo.getRoleCode())) {
			resp.setMsg("roleCode不能为空");
			return resp;
		}
		try {
			PageInfo<URoleAuthVo> info = userRoleClient.pageAuth(roleAuthVo, pageNum, pageSize);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
			resp.setData(info);

		} catch (Exception e) {
			logger.error("分页角色已授权操作失败，参数：[{}]，[{}]，[{}]", roleAuthVo, pageNum, pageSize, e);
			resp.setMsg(e.getMessage());
		}
		return resp;
	}

	@PostMapping(value = "/add")
	public ResponseData<String> add(URoleAuth roleAuth) {
		logger.info("角色授权权限，参数：[{}]", roleAuth);
		ResponseData<String> resp = null;
		try {
			return userRoleClient.add(roleAuth);
		} catch (Exception e) {
			logger.error("角色授权权限失败，参数：[{}]", roleAuth, e);
			resp = new ResponseData<>(ResponseCode.FAIL, e.getMessage());
		}
		return resp;
	}

	@PostMapping(value = "/update")
	public ResponseData<String> update(URoleAuth roleAuth) {
		logger.info("修改角色权限，参数：[{}]", roleAuth);
		ResponseData<String> resp = null;
		try {
			return userRoleClient.update(roleAuth);
		} catch (Exception e) {
			logger.error("修改角色权限失败，参数：[{}]", roleAuth, e);
			resp = new ResponseData<>(ResponseCode.FAIL, e.getMessage());
		}
		return resp;
	}

}
