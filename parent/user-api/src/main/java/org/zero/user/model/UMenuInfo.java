package org.zero.user.model;

import com.alibaba.fastjson.JSON;

/**
 * Database Table Remarks:
 *   菜单权限信息
 *
 * This class was generated by MyBatis Generator.
 * This class corresponds to the database table u_menu_info
 */
public class UMenuInfo {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column u_menu_info.permission_code
     *
     * @mbg.generated Tue Jun 30 11:36:44 CST 2020
     */
    private String permissionCode;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column u_menu_info.menu_name
     *
     * @mbg.generated Tue Jun 30 11:36:44 CST 2020
     */
    private String menuName;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column u_menu_info.menu_url
     *
     * @mbg.generated Tue Jun 30 11:36:44 CST 2020
     */
    private String menuUrl;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column u_menu_info.parent_menu
     *
     * @mbg.generated Tue Jun 30 11:36:44 CST 2020
     */
    private String parentMenu;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column u_menu_info.css_style
     *
     * @mbg.generated Tue Jun 30 11:36:44 CST 2020
     */
    private String cssStyle;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column u_menu_info.enabled
     *
     * @mbg.generated Tue Jun 30 11:36:44 CST 2020
     */
    private Boolean enabled;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column u_menu_info.permission_code
     *
     * @return the value of u_menu_info.permission_code
     *
     * @mbg.generated Tue Jun 30 11:36:44 CST 2020
     */
    public String getPermissionCode() {
        return permissionCode;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column u_menu_info.permission_code
     *
     * @param permissionCode the value for u_menu_info.permission_code
     *
     * @mbg.generated Tue Jun 30 11:36:44 CST 2020
     */
    public void setPermissionCode(String permissionCode) {
        this.permissionCode = permissionCode == null ? null : permissionCode.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column u_menu_info.menu_name
     *
     * @return the value of u_menu_info.menu_name
     *
     * @mbg.generated Tue Jun 30 11:36:44 CST 2020
     */
    public String getMenuName() {
        return menuName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column u_menu_info.menu_name
     *
     * @param menuName the value for u_menu_info.menu_name
     *
     * @mbg.generated Tue Jun 30 11:36:44 CST 2020
     */
    public void setMenuName(String menuName) {
        this.menuName = menuName == null ? null : menuName.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column u_menu_info.menu_url
     *
     * @return the value of u_menu_info.menu_url
     *
     * @mbg.generated Tue Jun 30 11:36:44 CST 2020
     */
    public String getMenuUrl() {
        return menuUrl;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column u_menu_info.menu_url
     *
     * @param menuUrl the value for u_menu_info.menu_url
     *
     * @mbg.generated Tue Jun 30 11:36:44 CST 2020
     */
    public void setMenuUrl(String menuUrl) {
        this.menuUrl = menuUrl == null ? null : menuUrl.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column u_menu_info.parent_menu
     *
     * @return the value of u_menu_info.parent_menu
     *
     * @mbg.generated Tue Jun 30 11:36:44 CST 2020
     */
    public String getParentMenu() {
        return parentMenu;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column u_menu_info.parent_menu
     *
     * @param parentMenu the value for u_menu_info.parent_menu
     *
     * @mbg.generated Tue Jun 30 11:36:44 CST 2020
     */
    public void setParentMenu(String parentMenu) {
        this.parentMenu = parentMenu == null ? null : parentMenu.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column u_menu_info.css_style
     *
     * @return the value of u_menu_info.css_style
     *
     * @mbg.generated Tue Jun 30 11:36:44 CST 2020
     */
    public String getCssStyle() {
        return cssStyle;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column u_menu_info.css_style
     *
     * @param cssStyle the value for u_menu_info.css_style
     *
     * @mbg.generated Tue Jun 30 11:36:44 CST 2020
     */
    public void setCssStyle(String cssStyle) {
        this.cssStyle = cssStyle == null ? null : cssStyle.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column u_menu_info.enabled
     *
     * @return the value of u_menu_info.enabled
     *
     * @mbg.generated Tue Jun 30 11:36:44 CST 2020
     */
    public Boolean getEnabled() {
        return enabled;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column u_menu_info.enabled
     *
     * @param enabled the value for u_menu_info.enabled
     *
     * @mbg.generated Tue Jun 30 11:36:44 CST 2020
     */
    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

	@Override
	public String toString() {
		return JSON.toJSONString(this);
	}
    
}