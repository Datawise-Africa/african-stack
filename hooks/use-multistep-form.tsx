import { useState, useCallback, useMemo } from "react";
import { useForm, type Path, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { z as zod } from "zod";
import type { LucideIcon } from "lucide-react";

export function createFormStep<T extends z.ZodType<any, any>>(options: {
  title: string;
  schema: T;
  Icon: LucideIcon;
  fields: Path<z.infer<T>>[]; // Autocomplete works here
  description?: string;
  render: (form: UseFormReturn<z.infer<T>>) => React.ReactNode; // Custom render function
}) {
  return {
    ...options,
    id: Math.random().toString(36).substring(2, 15),
  };
}

export function createMultistepFormConfig<
  TSchema extends z.ZodType<any, any>
>(options: {
  steps: ReturnType<typeof createFormStep>[];
  schema: TSchema;
  defaultValues?: Partial<z.infer<TSchema>>;
  onComplete: (data: z.infer<TSchema>) => Promise<void>;
}) {
  return options; // Inferred types flow through automatically
}

export type MultistepFormConfig = ReturnType<typeof createMultistepFormConfig>;

export function useMultistepForm<TSchema extends z.ZodType<any, any>>(
  config: ReturnType<typeof createMultistepFormConfig<TSchema>>
) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<zod.infer<typeof config.schema>>({
    resolver: zodResolver(config.schema) as any, // Use `as any` to avoid type issues with resolver
    defaultValues: config.defaultValues as any, // Use `as any` to avoid type issues with default values
    mode: "onChange",
  });

  const currentStep = config.steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === config.steps.length - 1;

  const validateCurrentStep = useCallback(async () => {
    const fieldsToValidate = currentStep.fields;
    const isValid = await form.trigger(fieldsToValidate as Path<z.infer<typeof config.schema>>[]);
    return isValid;
  }, [form, currentStep]);

  const goToNext = useCallback(async () => {
    const isValid = await validateCurrentStep();
    if (isValid && !isLastStep) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  }, [validateCurrentStep, isLastStep]);

  const goToPrevious = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  }, [isFirstStep]);

  const goToStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex >= 0 && stepIndex < config.steps.length) {
        setCurrentStepIndex(stepIndex);
      }
    },
    [config.steps.length]
  );

  const handleSubmit = useCallback(async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    if (isLastStep) {
      setIsSubmitting(true);
      try {
        console.log("Submitting form data:", form.getValues());

        const data = form.getValues();
        if (config.onComplete && typeof config.onComplete === "function") {
          await form.handleSubmit(config.onComplete!)(data);
        } else {
          console.warn("onComplete function is not defined in the config.");
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      goToNext();
    }
  }, [validateCurrentStep, isLastStep, config, form, goToNext]);

  const reset = useCallback(() => {
    setCurrentStepIndex(0);
    form.reset(config.defaultValues as any);
    setIsSubmitting(false);
  }, [form, config.defaultValues]);

  const progress = useMemo(() => {
    return ((currentStepIndex + 1) / config.steps.length) * 100;
  }, [currentStepIndex, config.steps.length]);

  return {
    // Form instance
    form,

    // Current state
    currentStep,
    currentStepIndex,
    totalSteps: config.steps.length,
    isSubmitting,

    // Navigation state
    isFirstStep,
    isLastStep,

    // Actions
    goToNext,
    goToPrevious,
    goToStep,
    handleSubmit,
    reset,

    // Progress
    progress,
  };
}
