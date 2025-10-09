"use client";

import { useEffect, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Category } from "@/lib/types";
import type { CollectionWithArticles } from "@/features/collections/hooks";
import {
  createMultistepFormConfig,
  useMultistepForm,
} from "@/hooks/use-multistep-form";

import {
  articleFormSchema,
  getDefaultArticleFormValues,
  type ArticleFormValues,
} from "../_types";
import { buildArticleSteps } from "./article-form-steps";
import { estimateReadTime } from "../_utils/form-utils";

export type ArticleFormProps = {
  categories?: Category[];
  collections?: CollectionWithArticles[];
  initialValues?: Partial<ArticleFormValues>;
  onSubmit: (values: ArticleFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
  submitLabel?: string;
};

export function ArticleForm({
  categories = [],
  collections = [],
  initialValues,
  onSubmit,
  isSubmitting,
  submitLabel = "Save article",
}: ArticleFormProps) {
  const mergedDefaults = useMemo(
    () => ({
      ...getDefaultArticleFormValues(),
      ...initialValues,
    }),
    [initialValues]
  );

  const formConfig = useMemo(
    () =>
      createMultistepFormConfig({
        schema: articleFormSchema,
        defaultValues: mergedDefaults,
        onComplete: async (values) => {
          await onSubmit(values);
        },
        steps: buildArticleSteps({ categories, collections }),
      }),
    [categories, collections, mergedDefaults, onSubmit]
  );

  const {
    form,
    currentStep,
    currentStepIndex,
    totalSteps,
    isFirstStep,
    isLastStep,
    goToNext,
    goToPrevious,
    handleSubmit,
    isSubmitting: isWizardSubmitting,
    progress,
  } = useMultistepForm(formConfig);

  useEffect(() => {
    form.reset(mergedDefaults);
  }, [form, mergedDefaults]);

  const contentHtml = form.watch("contentHtml");

  useEffect(() => {
    const readTime = estimateReadTime(contentHtml);
    const current = form.getValues("readTimeMins");
    if (readTime !== current) {
      form.setValue("readTimeMins", readTime, {
        shouldDirty: false,
        shouldTouch: false,
      });
    }
  }, [contentHtml, form]);

  const submitting = isSubmitting || isWizardSubmitting;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Article Editor</h1>
        <p className="text-muted-foreground">
          Move through each step to add metadata and content for your article.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="outline">Step {currentStepIndex + 1}</Badge>
          <span>of {totalSteps}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Progress {Math.round(progress)}%
        </div>
      </div>

      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <Card>
            <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle>{currentStep.title}</CardTitle>
                <CardDescription>{currentStep.description}</CardDescription>
              </div>
              <Badge variant="secondary">Guided step</Badge>
            </CardHeader>
            <CardContent>{currentStep.render(form)}</CardContent>
          </Card>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {!isFirstStep && (
                <Button variant="outline" type="button" onClick={goToPrevious}>
                  Previous
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              {!isLastStep && (
                <Button type="button" onClick={goToNext}>
                  Continue
                </Button>
              )}
              {isLastStep && (
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Saving…" : submitLabel}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
