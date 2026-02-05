import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// Mock dependencies
vi.mock("next-auth/react", () => ({
    useSession: vi.fn(),
    signIn: vi.fn(),
}));

vi.mock("sonner", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
        warning: vi.fn(),
    },
}));

// Mock AuthDialog to simplify test
vi.mock("@/components/auth/AuthDialog", () => ({
    AuthDialog: ({ open }: { open: boolean }) => (open ? <div data-testid="auth-dialog">Auth Dialog</div> : <div data-testid="auth-dialog-closed">Closed</div>),
}));

// Mock fetch
global.fetch = vi.fn();

describe("ReviewForm", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (useSession as unknown as Mock).mockReturnValue({
            data: { user: { name: "Test User" } },
            status: "authenticated",
        });
    });

    it("renders correctly", () => {
        render(<ReviewForm toolSlug="test-tool" />);
        expect(screen.getByText("Write a Review")).toBeInTheDocument();
        expect(screen.getByText("Post Review")).toBeInTheDocument();
    });

    it("shows warning if rating is not selected", () => {
        render(<ReviewForm toolSlug="test-tool" />);
        // Button is disabled, so we trigger form submit directly or check disabled state.
        // But to test the logic inside handleSubmit, we force submit.
        const form = screen.getByRole("button", { name: /post review/i }).closest("form");
        fireEvent.submit(form!);

        expect(toast.warning).toHaveBeenCalledWith("Please select a rating");
    });

    it.skip("opens auth dialog if not logged in", async () => {
        (useSession as unknown as Mock).mockReturnValue({
            data: null,
            status: "unauthenticated",
        });

        render(<ReviewForm toolSlug="test-tool" />);

        // Use should select rating to enable button
        const stars = screen.getAllByRole("button");
        fireEvent.click(stars[4]);

        const submitButton = screen.getByText("Post Review");
        fireEvent.click(submitButton);

        await waitFor(() => expect(screen.getByTestId("auth-dialog")).toBeInTheDocument());
    });

    it("submits review successfully", async () => {
        (global.fetch as unknown as Mock).mockResolvedValue({
            ok: true,
            json: async () => ({}),
        });

        render(<ReviewForm toolSlug="test-tool" />);

        // Select 5 stars
        const stars = screen.getAllByRole("button");
        fireEvent.click(stars[4]);

        // Enter content
        const textarea = screen.getByPlaceholderText("Share your experience with this tool...");
        fireEvent.change(textarea, { target: { value: "Great tool!" } });

        // Submit
        const submitButton = screen.getByText("Post Review");
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith("/api/reviews", expect.objectContaining({
                method: "POST",
                body: JSON.stringify({
                    toolSlug: "test-tool",
                    rating: 5,
                    content: "Great tool!",
                }),
            }));
        });

        expect(toast.success).toHaveBeenCalledWith("Review submitted successfully!");
    });

    it("handles submission error", async () => {
        (global.fetch as unknown as Mock).mockResolvedValue({
            ok: false,
            json: async () => ({ error: "Server Error" }),
        });

        render(<ReviewForm toolSlug="test-tool" />);

        const stars = screen.getAllByRole("button");
        fireEvent.click(stars[4]);

        const textarea = screen.getByPlaceholderText("Share your experience with this tool...");
        fireEvent.change(textarea, { target: { value: "Great tool!" } });

        const submitButton = screen.getByText("Post Review");
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Server Error");
        });
    });
});
