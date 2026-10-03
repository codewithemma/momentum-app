import apis from "@/services/api-services";
import {
  CreateLeadFormValues,
  CreateLeadResponse,
  ErrorResponse,
} from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateLead = () => {
  const queryClient = useQueryClient();
  return useMutation<
    CreateLeadResponse,
    AxiosError<ErrorResponse>,
    CreateLeadFormValues
  >({
    mutationFn: async (
      data: CreateLeadFormValues,
    ): Promise<CreateLeadResponse> => {
      const res = await apis.leads.createLead(data);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
    },
  });
};

export const useUpdateLead = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateLeadResponse,
    AxiosError<ErrorResponse>,
    {
      id: string;
      data: object;
    }
  >({
    mutationFn: async ({ id, data }): Promise<CreateLeadResponse> => {
      const res = await apis.leads.updateLead(id, data);
      return res.data;
    },

    onSuccess: async (_, { id }) => {
      await queryClient.invalidateQueries({
        queryKey: ["leads"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["get-lead-by-id", id],
      });
    },
  });
};
