import apis from "@/services/api-services";
import { ErrorResponse, OnboardingFormValues } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCompleteOnboarding = () => {
  return useMutation<string, AxiosError<ErrorResponse>, OnboardingFormValues>({
    mutationFn: async (data: OnboardingFormValues): Promise<string> => {
      const res = await apis.auth.completeOnboarding(data);
      return res.data;
    },
  });
};
