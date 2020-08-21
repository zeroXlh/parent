package customer;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.env.Environment;

public class DefaultProfileExample {
	public static void main(String[] args) {
		ApplicationContext context = new ClassPathXmlApplicationContext();
		
		Environment environment = context.getEnvironment();
		
//		environment.
	}
}
