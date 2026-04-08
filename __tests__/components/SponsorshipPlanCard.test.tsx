import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SponsorshipPlanCard, Plan } from "@/components/monetization/SponsorshipPlanCard";

describe("SponsorshipPlanCard Component", () => {
  const mockPlan: Plan = {
    name: "Standard",
    price: "$99",
    description: "Standard Test Plan",
    features: ["Feature A", "Feature B"],
    placement: "sidebar",
    color: "blue",
    isPremium: false,
  };

  it("renders the plan name and price correctly", () => {
    // Arrange
    const mockSetSelectedPlan = jest.fn();

    // Act
    render(
      <SponsorshipPlanCard
        plan={mockPlan}
        selectedPlan="Premium"
        setSelectedPlan={mockSetSelectedPlan}
      />
    );
    const planName = screen.getByText("Standard");
    const planPrice = screen.getByText("$99");

    // Assert
    expect(planName).toBeInTheDocument();
    expect(planPrice).toBeInTheDocument();
  });

  it("calls setSelectedPlan correctly when clicked", () => {
    // Arrange
    const mockSetSelectedPlan = jest.fn();

    render(
      <SponsorshipPlanCard
        plan={mockPlan}
        selectedPlan="Premium"
        setSelectedPlan={mockSetSelectedPlan}
      />
    );

    // Act
    const cardElement = screen.getByText("Select Plan").parentElement;
    if (cardElement) fireEvent.click(cardElement);

    // Assert
    expect(mockSetSelectedPlan).toHaveBeenCalledWith("Standard");
  });
});
