package org.zero.customer;

import static java.time.temporal.ChronoField.DAY_OF_MONTH;
import static java.time.temporal.ChronoField.MONTH_OF_YEAR;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.MonthDay;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;

@MappedJdbcTypes(JdbcType.VARCHAR)
@MappedTypes(MonthDay.class)
public class MonthDayTypeHandler extends BaseTypeHandler<MonthDay> {

	private static final DateTimeFormatter PARSER = new DateTimeFormatterBuilder()
			.appendValue(MONTH_OF_YEAR, 2)
			.appendLiteral('-')
			.appendValue(DAY_OF_MONTH, 2)
			.toFormatter();

	@Override
	public void setNonNullParameter(PreparedStatement ps, int i, MonthDay monthDay, JdbcType jt) throws SQLException {
		ps.setString(i, monthDay.toString());
	}

	@Override
	public MonthDay getNullableResult(ResultSet rs, String columnName) throws SQLException {
		String value = rs.getString(columnName);
		return value == null ? null : MonthDay.parse(value, PARSER);
	}

	@Override
	public MonthDay getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
		String value = rs.getString(columnIndex);
		return value == null ? null : MonthDay.parse(value, PARSER);
	}

	@Override
	public MonthDay getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
		String value = cs.getString(columnIndex);
		return value == null ? null : MonthDay.parse(value, PARSER);
	}

}
