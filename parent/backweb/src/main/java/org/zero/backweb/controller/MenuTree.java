package org.zero.backweb.controller;

import java.util.List;

import com.alibaba.fastjson.JSON;

/**
 * 菜单树
 * 
 * @author Administrator
 *
 */
public class MenuTree {
	private String id;

	private String text;

	private String icon;

	private String url;

	private List<MenuTree> menus;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public List<MenuTree> getMenus() {
		return menus;
	}

	public void setMenus(List<MenuTree> menus) {
		this.menus = menus;
	}

	@Override
	public String toString() {
		return JSON.toJSONString(this);
	}

}
