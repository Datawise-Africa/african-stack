import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/api";
import { tokenManager } from "@/lib/auth";

export type CreatorRequestStatus = "pending" | "approved" | "revoked";

export type BecomeCreatorRequest = {
  id: number;
  first_name: string;
  last_name: string;
  user_email: string;
  reason: string;
  status: CreatorRequestStatus;
  created_at: string;
  updated_at: string;
};

const CREATOR_REQUESTS_ENDPOINT = "/users/request-become-author/";
const CREATOR_REQUESTS_QUERY_KEY = ["creator-requests"] as const;

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

async function updateCreatorRequestStatus({
  id,
  status,
}: {
  id: number;
  status: CreatorRequestStatus;
}) {
  const token = tokenManager.getToken();
  if (!token) {
    throw new Error("You need to sign in to update a request.");
  }

  await apiClient.patch(
    `${CREATOR_REQUESTS_ENDPOINT}${id}/`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function useCreatorRequests(enabled: boolean, userId?: string | number) {
  return useQuery<BecomeCreatorRequest[], Error>({
    queryKey: [...CREATOR_REQUESTS_QUERY_KEY, userId ?? "current"],
    queryFn: fetchCreatorRequests,
    enabled,
  });
}

export function useSubmitCreatorRequest() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: submitCreatorRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CREATOR_REQUESTS_QUERY_KEY });
    },
  });
}

export function useUpdateCreatorRequestStatus() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { id: number; status: CreatorRequestStatus }>(
    {
      mutationFn: updateCreatorRequestStatus,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: CREATOR_REQUESTS_QUERY_KEY });
      },
    }
  );
}
