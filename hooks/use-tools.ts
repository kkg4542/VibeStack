import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateToolInput, CreateReviewInput } from "@/lib/schemas";

// Tool Queries
const fetchTools = async (params?: { category?: string; pricing?: string; page?: number; limit?: number; q?: string }) => {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.set("category", params.category);
  if (params?.pricing) searchParams.set("pricing", params.pricing);
  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.limit) searchParams.set("limit", params.limit.toString());
  if (params?.q) searchParams.set("q", params.q);

  const response = await fetch(`/api/tools?${searchParams.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch tools");
  const json = await response.json();
  return json.data ?? json;
};

const fetchTool = async (slug: string) => {
  const response = await fetch(`/api/tools/${slug}`);
  if (!response.ok) throw new Error("Failed to fetch tool");
  const json = await response.json();
  return json.data ?? json;
};

const createTool = async (data: CreateToolInput) => {
  const response = await fetch("/api/tools", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create tool");
  return response.json();
};

// Review Queries
const fetchReviews = async (toolId: string) => {
  const response = await fetch(`/api/reviews?toolId=${toolId}`);
  if (!response.ok) throw new Error("Failed to fetch reviews");
  return response.json();
};

const createReview = async (data: CreateReviewInput) => {
  const response = await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create review");
  return response.json();
};

// Hooks
export function useTools(params?: Parameters<typeof fetchTools>[0]) {
  return useQuery({
    queryKey: ["tools", params],
    queryFn: () => fetchTools(params),
  });
}

export function useAllTools() {
  const query = useTools({ limit: 500 });
  return {
    ...query,
    tools: query.data?.tools ?? [],
  };
}

export function useTool(slug: string) {
  return useQuery({
    queryKey: ["tool", slug],
    queryFn: () => fetchTool(slug),
    enabled: !!slug,
  });
}

export function useCreateTool() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTool,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tools"] });
    },
  });
}

export function useReviews(toolId: string) {
  return useQuery({
    queryKey: ["reviews", toolId],
    queryFn: () => fetchReviews(toolId),
    enabled: !!toolId,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}
