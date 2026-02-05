import { renderHook, waitFor } from "@testing-library/react";
import { useTools, useCreateReview } from "@/hooks/use-tools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe("useTools Hook", () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("fetches tools successfully", async () => {
        const mockResponse = {
            tools: [{ id: "1", slug: "test-tool", title: "Test Tool" }],
            pagination: { total: 1 }
        };

        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
            ok: true,
            json: async () => mockResponse,
        });

        const { result } = renderHook(() => useTools(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(mockResponse);
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/api/tools"));
    });

    it("handles fetch error", async () => {
        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
            ok: false,
        });

        const { result } = renderHook(() => useTools(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error).toBeDefined();
    });
});

describe("useCreateReview Hook", () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("creates review successfully", async () => {
        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
            ok: true,
            json: async () => ({ id: "review-1" }),
        });

        const { result } = renderHook(() => useCreateReview(), { wrapper: createWrapper() });

        result.current.mutate({ toolSlug: "test-tool", rating: 5, content: "Great!" });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(global.fetch).toHaveBeenCalledWith("/api/reviews", expect.objectContaining({
            method: "POST",
            body: JSON.stringify({ toolSlug: "test-tool", rating: 5, content: "Great!" }),
        }));
    });
});
