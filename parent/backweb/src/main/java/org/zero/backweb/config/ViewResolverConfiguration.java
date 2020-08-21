//package com.hoper.web.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
//
//@Configuration
//public class ViewResolverConfiguration extends WebMvcConfigurerAdapter {
////	@Bean
////	public InternalResourceViewResolver getJspViewResolver() {
////		InternalResourceViewResolver jspViewResolver = new InternalResourceViewResolver();
////		jspViewResolver.setPrefix("/WEB-INF/views/");
////		jspViewResolver.setSuffix(".jsp");
////		jspViewResolver.setViewClass(JstlView.class);
////		// 通过ViewNames属性来实现，通过请求中返回的视图名称匹配其采用哪个对应的视图解析器处理，从而找到对应prefix下的页面
////		jspViewResolver.setViewNames("jsp/*");
////		jspViewResolver.setOrder(10);
////		// 开发时不启用缓存，改动即可生效
////		jspViewResolver.setCache(false);
////		return jspViewResolver;
////	}
////	@Bean
////    public BeanNameViewResolver beanNameViewResolver () {
////        return  new BeanNameViewResolver(); // 示例代码
////    }
//
//	@Override
//	public void addResourceHandlers(ResourceHandlerRegistry registry) {
//		super.addResourceHandlers(registry);
//		registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
////		registry.addResourceHandler("/mystatic/**").addResourceLocations("classpath:/mystatic/");
//	}
//	
//}
