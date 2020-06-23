package org.zero.backweb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CustomerViewController {
	
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

//	/**
//	 * 客户手机号管理页
//	 * 
//	 * @param model
//	 * @return
//	 */
//	@RequestMapping("/customer/phone")
//	public String phonePage(Model model) {
//		return "customer/phone";
//	}

	/**
	 * 客户手机号管理页
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
	
}
