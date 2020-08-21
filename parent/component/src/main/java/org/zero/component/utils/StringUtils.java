package org.zero.component.utils;

public final class StringUtils extends org.apache.commons.lang.StringUtils {
	// public static boolean isEmpty

	public static String requireNonEmpty(String str) {
		if (isEmpty(str))
			throw new NullPointerException();
		return str;
	}

	public static String requireNonEmpty(String str, String message) {
		if (isEmpty(str))
			throw new NullPointerException(message);
		return str;
	}
}
