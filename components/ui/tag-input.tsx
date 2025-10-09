"use client";

import { useState, useRef } from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type TagInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  inputClassName?: string;
  className?: string;
};

export function TagInput({
  value,
  onChange,
  placeholder,
  disabled,
  inputClassName,
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed) return;
    if (value.includes(trimmed)) {
      setInputValue("");
      return;
    }
    onChange([...value, trimmed]);
    setInputValue("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((existing) => existing !== tag));
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(inputValue);
    } else if (event.key === "Backspace" && inputValue.length === 0 && value.length) {
      event.preventDefault();
      const newValues = [...value];
      newValues.pop();
      onChange(newValues);
    }
  };

  return (
    <div className={cn("flex flex-wrap gap-2 rounded-md border bg-background p-2", className)}>
      {value.map((tag) => (
        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            disabled={disabled}
            className="rounded-full p-0.5 text-muted-foreground hover:text-foreground"
            aria-label={`Remove tag ${tag}`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <Input
        ref={inputRef}
        value={inputValue}
        disabled={disabled}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn("flex-1 min-w-[120px] border-none bg-transparent focus-visible:ring-0", inputClassName)}
      />
    </div>
  );
}
