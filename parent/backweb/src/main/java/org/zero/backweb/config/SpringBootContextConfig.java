//package com.hoper.web.config;
//
//import javax.servlet.ServletContext;
//import javax.servlet.ServletContextEvent;
//import javax.servlet.ServletContextListener;
//
//import org.springframework.beans.BeansException;
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.ApplicationContextAware;
//import org.springframework.stereotype.Component;
//
//@Component
//public class SpringBootContextConfig implements ApplicationContextAware, ServletContextListener {
//
//	/**
//	 * 上下文对象实例
//	 */
//	private ApplicationContext applicationContext;
//
//	private ServletContext servletContext;
//
//	@Override
//	public void contextInitialized(ServletContextEvent sce) {
//		// TODO Auto-generated method stub
//		this.servletContext = sce.getServletContext();
//	}
//
//	@Override
//	public void contextDestroyed(ServletContextEvent sce) {
//		// TODO Auto-generated method stub
//
//	}
//
//	@Override
//	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
//		this.applicationContext = applicationContext;
//	}
//
//	public ApplicationContext getApplicationContext() {
//		return applicationContext;
//	}
//
//	public ServletContext getServletContext() {
//		return servletContext;
//	}
//
//}
