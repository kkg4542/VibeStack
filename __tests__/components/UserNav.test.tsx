import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserNav } from "@/components/layout/UserNav";
import { useSession } from "next-auth/react";

// Mock next-auth
jest.mock("next-auth/react");

describe("UserNav Component", () => {
  it("renders the Sign In button when the user is not authenticated", () => {
    // Arrange
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    // Act
    render(<UserNav />);
    const signInButton = screen.getByText(/Sign In/i);

    // Assert
    expect(signInButton).toBeInTheDocument();
  });

  it("renders the User Avatar when the user is authenticated", () => {
    // Arrange
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: "Test User",
          email: "test@example.com",
          image: null,
        },
      },
      status: "authenticated",
    });

    // Act
    render(<UserNav />);
    const avatarFallback = screen.getByText("T");

    // Assert
    expect(avatarFallback).toBeInTheDocument();
  });
});
