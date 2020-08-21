package org.zero.backweb.config;

import org.springframework.beans.factory.FactoryBean;
import org.zero.backweb.controller.user.UserController;

public class UserControllerFactoryBean implements FactoryBean<UserController> {

	@Override
	public UserController getObject() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Class<UserController> getObjectType() {
		// TODO Auto-generated method stub
		return null;
	}
	
}
