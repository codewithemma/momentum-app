import apis from "@/services/api-services";
import {
  CreateLeadFormValues,
  CreateActivityInput,
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
      await queryClient.invalidateQueries({
        queryKey: ["pipeline-leads"],
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
      await queryClient.invalidateQueries({
        queryKey: ["pipeline-leads"],
      });
    },
  });
};

export const useDeleteLead = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ErrorResponse>, string>({
    mutationFn: async (id) => {
      await apis.leads.deleteLead(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["pipeline-leads"],
      });
    },
  });
};

export const useCreateLeadActivity = (leadId: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ErrorResponse>, CreateActivityInput>({
    mutationFn: async (data) => {
      await apis.leads.createActivity(leadId, data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["lead-activities", leadId],
      });
    },
  });
};
