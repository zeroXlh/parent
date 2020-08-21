package org.zero.backweb.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.zero.backweb.interceptor.Auth;

@Controller
@RequestMapping("/hoper/backweb")
public class ViewController {

	@RequestMapping("/index")
	public String index() {
		return "index";
	}

	@RequestMapping("/main")
	public String main(Model model, HttpServletRequest request) {
		String serverName = request.getServerName();
		model.addAttribute("requestHost", serverName);
		return "main";
	}

	@RequestMapping("/include")
	public String include(Model model) {
		return "include";
	}

	@RequestMapping("/home")
	public String home() {
		return "home";
	}

	// ==================客户管理页面============================

	/**
	 * 客户账户管理页
	 *
	 * @param model
	 * @return
	 */
	@RequestMapping("/customer/account")
	public String account(Model model) {
		return "customer/account";
	}

	/**
	 * 客户信息
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping("/customer/customer")
	public String customerPage(Model model) {
		return "customer/customer";
	}

	/**
	 * 企业客户易保全注册管理页
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping("/customer/register")
	public String registerPage(Model model) {
		return "customer/register";
	}

	/**
	 * 客户银行卡管理页
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping("/customer/bank")
	public String bankPage(Model model) {
		return "customer/bank";
	}

	// ==================用户管理页面=====================

	@RequestMapping("/user/department")
	public String department() {
		return "user/department";
	}

	@RequestMapping("/user/user")
	public String userPage() {
		return "user/user";
	}

	@RequestMapping("/user/role")
	public String rolePage() {
		return "user/role";
	}

	@RequestMapping("/user/permission")
	public String permissionPage() {
		return "user/permission";
	}

	@RequestMapping("/user/auth")
	public String auth() {
		return "user/auth";
	}

	@RequestMapping("/user/menu")
	public String menu() {
		return "user/menu";
	}

	@RequestMapping("/user/roleMenu")
	@Auth("A1021")
	public String roleMenu() {
		return "user/role_menu";
	}

	@RequestMapping("/user/roleAuth")
	@Auth("A1022")
	public String roleAuth() {
		return "user/role_auth";
	}

	@RequestMapping("/user/userRole")
	@Auth("A1020")
	public String userRolePage() {
		return "user/user_role";
	}

}
