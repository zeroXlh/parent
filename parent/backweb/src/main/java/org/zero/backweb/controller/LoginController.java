package org.zero.backweb.controller;

import static org.zero.component.web.LoginConstant.LOGIN_USER_INFO;
import static org.zero.component.web.LoginConstant.LOGIN_USER_MENU;
import static org.zero.component.web.LoginConstant.LOGIN_USER_OPERATE;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zero.backweb.client.user.UserClient;
import org.zero.component.web.ResponseCode;
import org.zero.component.web.ResponseData;
import org.zero.user.model.UMenuInfo;
import org.zero.user.model.UOperatePermission;
import org.zero.user.model.UUser;

@RestController
public class LoginController {

	private static Logger logger = LoggerFactory.getLogger(LoginController.class);

	// @Autowired
	// private UUserService uUserService;
	// @Autowired
	// private UMenuInfoService uMenuInfoService;
	// @Autowired
	// private UOperatePermissionService uOperatePermissionService;
	@Autowired
	private UserClient userClient;

	@PostMapping("/login")
	public ResponseData<String> login(HttpSession session, String userName, String password) {
		logger.info("login system，请求参数：[{}]，[{}]", userName, password);
		ResponseData<String> resp = new ResponseData<>(ResponseCode.FAIL);

		try {

			// 1、查找用户是否存在
			UUser user = userClient.fetchUserByUserName(userName);
			logger.info("登录查询用户信息：[{}]", user);

			// TODO test code

			UUser uUser = userClient.fetchUserByUserName1(userName);
			logger.info("测试代码成功：{}", uUser);
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
			List<UMenuInfo> menuInfos = userClient.fetchMenu(user.getUserId());
			logger.debug("菜单权限信息: {}", menuInfos);
			//
			// // 5、查询并缓存用户操作权限
			List<UOperatePermission> operateAuths = userClient.fetchOperates(user.getUserId());
			logger.debug("操作权限信息: {}", operateAuths);
			Set<String> collect = operateAuths.stream().map(UOperatePermission::getPermissionCode)
					.collect(Collectors.toSet());
			logger.debug("处理后的操作权限信息: {}", collect);

			session.setAttribute(LOGIN_USER_INFO, user);
			session.setAttribute(LOGIN_USER_MENU, menuTree(menuInfos));
			session.setAttribute(LOGIN_USER_OPERATE, collect);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
		} catch (Exception e) {
			logger.error("登录失败，请求参数：[{}]，[{}]", userName, password, e);
			resp.setMsg("登录失败：" + e.getMessage());
		}

		return resp;
	}

	private List<MenuTree> menuTree(List<UMenuInfo> menuInfos) {
		List<MenuTree> trees = new ArrayList<>();

		List<UMenuInfo> collect = menuInfos.stream().filter(e -> StringUtils.isEmpty(e.getParentMenu()))
				.collect(Collectors.toList());

		Map<String, List<UMenuInfo>> collect2 = menuInfos.stream().filter(e -> !StringUtils.isEmpty(e.getParentMenu()))
				.collect(Collectors.groupingBy(UMenuInfo::getParentMenu));

		collect.stream().forEach((e) -> {
			MenuTree tree = new MenuTree();
			tree.setId(e.getPermissionCode());
			tree.setText(e.getMenuName());
			tree.setIcon(e.getCssStyle());
			tree.setUrl(e.getMenuUrl());
			tree.setMenus(new ArrayList<>());

			collect2.get(e.getPermissionCode()).stream().forEach((son) -> {
				MenuTree leaf = new MenuTree();
				leaf.setId(son.getPermissionCode());
				leaf.setText(son.getMenuName());
				leaf.setIcon(son.getCssStyle());
				leaf.setUrl(son.getMenuUrl());

				tree.getMenus().add(leaf);
			});

			trees.add(tree);
		});

		return trees;
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
