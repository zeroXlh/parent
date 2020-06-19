package org.zero.customer.config;

import java.util.Properties;

import javax.sql.DataSource;

import org.apache.ibatis.mapping.VendorDatabaseIdProvider;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

public class MybatisConfig {

	public VendorDatabaseIdProvider databaseIdProvider() {
		Properties properties = new Properties();

		properties.put("SQL Server", "sqlserver");
		properties.put("DB2", "db2");
		properties.put("Oracle", "oracle");
		properties.put("MySQL", "mysql");

		VendorDatabaseIdProvider provider = new VendorDatabaseIdProvider();
		provider.setProperties(properties);
		return provider;
	}
	
	public SqlSessionFactoryBean sqlSessionFactory() {
		SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
		
//		factoryBean.setMapperLocations(mapperLocations);
		
		return factoryBean;
	}
	
	
	/** transaction standard configuration
	 * @param dataSource
	 * @return
	 */
	public DataSourceTransactionManager transactionManager(DataSource dataSource) {
		return new DataSourceTransactionManager(dataSource);
	}
}
