import { useMutation, useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/api";
import { tokenManager } from "@/lib/auth";

export type BecomeCreatorRequest = {
  id: number;
  first_name: string;
  last_name: string;
  user_email: string;
  reason: string;
  status: "pending" | "approved" | "revoked";
  created_at: string;
  updated_at: string;
};

const CREATOR_REQUESTS_ENDPOINT = "/users/request-become-author/";

async function fetchCreatorRequests(): Promise<BecomeCreatorRequest[]> {
  const token = tokenManager.getToken();
  if (!token) {
    throw new Error("You need to sign in to view your requests.");
  }

  const response = await apiClient.get<
    BecomeCreatorRequest[] | { results: BecomeCreatorRequest[] }
  >(CREATOR_REQUESTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (Array.isArray(response.data)) {
    return response.data;
  }

  return response.data?.results ?? [];
}

async function submitCreatorRequest(reason: string) {
  const token = tokenManager.getToken();
  if (!token) {
    throw new Error("You need to sign in to submit a request.");
  }

  await apiClient.post(
    CREATOR_REQUESTS_ENDPOINT,
    { reason },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function useCreatorRequests(enabled: boolean) {
  return useQuery<BecomeCreatorRequest[], Error>({
    queryKey: ["creator-requests"],
    queryFn: fetchCreatorRequests,
    enabled,
  });
}

export function useSubmitCreatorRequest() {
  return useMutation<void, Error, string>({
    mutationFn: submitCreatorRequest,
  });
}
