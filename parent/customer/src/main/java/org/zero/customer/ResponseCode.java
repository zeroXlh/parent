package org.zero.customer;

public enum ResponseCode {
	FAIL, SUCC;

	public static ResponseCode valueOf(int intValue) {
		if (intValue < 0 || intValue > SUCC.ordinal())
			throw new IllegalArgumentException("value out of range[0, " + SUCC.ordinal() + "]: " + intValue);

		return values()[intValue];
	}
}
