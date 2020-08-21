package org.zero.user.controller;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import static org.zero.component.web.LoginConstant.*;
import org.zero.component.web.ResponseCode;
import org.zero.component.web.ResponseData;
import org.zero.user.model.UMenuInfo;
import org.zero.user.model.UOperatePermission;
import org.zero.user.model.UUser;
import org.zero.user.service.UMenuInfoService;
import org.zero.user.service.UOperatePermissionService;
import org.zero.user.service.UUserService;

@RestController
public class LoginController {

	private static Logger logger = LoggerFactory.getLogger(LoginController.class);

	@Autowired
	private UUserService uUserService;
	@Autowired
	private UMenuInfoService uMenuInfoService;
	@Autowired
	private UOperatePermissionService uOperatePermissionService;

	@PostMapping("/login")
	@CrossOrigin
	public ResponseData<String> login(HttpSession session, String userName, String password) {
		logger.info("login system，请求参数：[{}]，[{}]", userName, password);
		ResponseData<String> resp = new ResponseData<>(ResponseCode.FAIL);

		try {

			// 1、查找用户是否存在
			UUser user = uUserService.findByUserName(userName);
			// Optional.ofNullable(uUserService.findByUserName(userName)).ifPresent(consumer);
			if (Objects.isNull(user)) {
				resp.setMsg("用户不存在");
				return resp;
			}

			// 2、校验用户名与密码是否一致
			if (!user.getPassword().equalsIgnoreCase(password)) {
				resp.setMsg("用户密码错误");
				return resp;
			}
			// 3、用户状态
			if (user.getEnabled() == Boolean.FALSE) {
				resp.setMsg("用户未激活");
				return resp;
			}

			// 4、查询并缓存用户菜单
			List<UMenuInfo> menuInfos = uMenuInfoService.findByUser(user.getUserId());
			logger.debug("菜单权限信息: {}", menuInfos);
			// 5、查询并缓存用户操作权限
			List<UOperatePermission> operateAuths = uOperatePermissionService.findByUser(user.getUserId());
			logger.debug("操作权限信息: {}", operateAuths);

			session.setAttribute(LOGIN_USER_INFO, user);
			session.setAttribute(LOGIN_USER_MENU, menuInfos);
			session.setAttribute(LOGIN_USER_OPERATE, operateAuths);

		} catch (Exception e) {
			logger.error("登录失败，请求参数：[{}]，[{}]", userName, password, e);
			resp.setMsg("登录失败：" + e.getMessage());
		}

		return resp;
	}

	@GetMapping("/logout")
	public void logout(HttpSession session, HttpServletResponse response) {
		logger.info("用户正常导出系统，用户：[{}]", session.getAttribute(LOGIN_USER_INFO));

		try {
			session.invalidate();
			
			response.sendRedirect("");
		} catch (IOException e) {
			logger.error("用户正常导出系统失败", e);
		}
	}

}
