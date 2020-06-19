package customer;

import java.io.IOException;
import java.io.Reader;
import java.time.MonthDay;
import java.util.List;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;
import org.zero.customer.model.CCustAccount;
import org.zero.customer.model.CCustInfo;
import org.zero.customer.model.CCustInfoVo;
import org.zero.customer.service.mapper.CCustAccountMapper;
import org.zero.customer.service.mapper.CCustInfoMapper;

public class MybatisFactoryExamples {

	@Test
	public void test() {
		
		try (Reader resourceAsReader = Resources.getResourceAsReader("mybatis-config.xml");) {
			
			SqlSessionFactory sessionFactory = new SqlSessionFactoryBuilder().build(resourceAsReader);
			
			SqlSession openSession = sessionFactory.openSession();
			
			CCustInfoMapper mapper = openSession.getMapper(CCustInfoMapper.class);
			
			CCustInfo cCustInfo = mapper.selectByPrimaryKey(1);
			
			System.out.println(cCustInfo);
			
			MonthDay monthDay = MonthDay.from(cCustInfo.getBirth());
			System.out.println(monthDay);
			
			List<CCustInfoVo> list = mapper.selectExtendByColumn(null);
			System.out.println(list);
			
//			new Environment.Builder("");
			
//			DataSource dataSource = BlogDataSourceFactory.getBlogDataSource();
//			TransactionFactory transactionFactory = new JdbcTransactionFactory();
//			Environment environment = new Environment("development", transactionFactory, dataSource);
//			Configuration configuration = new Configuration(environment);
//			configuration.addMapper(BlogMapper.class);
//			SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(configuration);
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
	}
	
	@Test
	public void addAccount() {
		
		try (Reader resourceAsReader = Resources.getResourceAsReader("mybatis-config.xml");) {
			
			SqlSessionFactory sessionFactory = new SqlSessionFactoryBuilder().build(resourceAsReader);
			
			SqlSession openSession = sessionFactory.openSession();
			
			CCustAccountMapper mapper = openSession.getMapper(CCustAccountMapper.class);
			
			CCustAccount record=new CCustAccount();
			record.setCustId(1);
			record.setPhoneNo("123456789");
			record.setUserName("tom");
			record.setEmail("tom@qq.com");
			mapper.insert(record);
			
			openSession.commit();
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

}
