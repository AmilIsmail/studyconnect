import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ModuleCard from "../components/ModuleCard";

describe("ModuleCard", () => {
  it("shows module information", () => {
    render(
      <ModuleCard
        id={1}
        name="Web Applications"
        faculty="Informatics"
        program="Applied Informatics"
        semester={3}
        onShowSuggestions={vi.fn()}
      />,
    );

    expect(screen.getByText("Web Applications")).toBeInTheDocument();
    expect(screen.getByText(/Applied Informatics/)).toBeInTheDocument();
  });
});
