"use server";
import { JsonObject } from "type-fest";
import { cookies } from "next/headers"; // 导入 cookies 模块

export async function setCookies(
  name: string,
  value?: string | JsonObject,
  path?: string,
) {
  const cookieStore = await cookies();
  cookieStore.set(name, JSON.stringify(value), { path: path || "/" });
}

export async function getCookie(name: string): Promise<string | null> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(name);
  try {
    return cookieValue ? JSON.parse(cookieValue.value) : null; // 如果 cookie 存在，则解析并返回，否则返回 null
  } catch {
    return null;
  }
}

export async function getAuthorization(): Promise<string> {
  const jwt = await getCookie("jwt");
  if (!jwt) {
    throw new Error("JWT token not found");
  }
  return `Bearer ${jwt}`;
}
