import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function maskSensitiveValue(
  value: string,
  visibleStart = 3,
  visibleEnd = 2,
  maskChar = "*"
): string {
  const trimmed = value?.trim();
  if (!trimmed) {
    return "";
  }

  if (trimmed.length <= visibleStart + visibleEnd) {
    return maskChar.repeat(trimmed.length);
  }

  const start = trimmed.slice(0, visibleStart);
  const end = trimmed.slice(trimmed.length - visibleEnd);
  const maskedLength = trimmed.length - visibleStart - visibleEnd;

  return `${start}${maskChar.repeat(maskedLength)}${end}`;
}
