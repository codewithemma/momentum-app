import apis from "@/services/api-services";
import { ErrorResponse, LeadSource } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useUpdateCurrentUser = () => {
  return useMutation<void, AxiosError<ErrorResponse>, { name: string }>({
    mutationFn: async (data) => {
      await apis.users.updateMe(data);
    },
  });
};

export const useUpdateDefaultLeadSource = () => {
  return useMutation<
    void,
    AxiosError<ErrorResponse>,
    LeadSource | null
  >({
    mutationFn: async (defaultLeadSource) => {
      await apis.users.updateDefaultLeadSource(defaultLeadSource);
    },
  });
};
