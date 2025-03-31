import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TagInputComponent from "../../components/tags-input";

describe("TagInputComponent Component", () => {

    let component = <TagInputComponent />;

    it("should render input field", () => {
        render(component);
        expect(screen.getByPlaceholderText("Type and press Enter or use ','")).toBeDefined();
    });

    it("should add tags when pressing Enter", () => {
        render(component);
        const input = document.getElementById('tag-input') as HTMLElement;
        fireEvent.change(input, { target: { value: "tag1" } });
        fireEvent.keyDown(input, { key: "Enter" });

        expect(screen.getByText("tag1")).toBeDefined();
    });

    it("should add tags and click to blank screen", () => {
        render(component);
        const input = document.getElementById('tag-input') as HTMLElement;

        fireEvent.change(input, { target: { value: "tag1" } });
        fireEvent.blur(input);

        expect(screen.getByText("tag1")).toBeDefined();
    });

    it("should not add duplicate tags", () => {
        render(component);
        const input = document.getElementById('tag-input') as HTMLElement;

        fireEvent.change(input, { target: { value: "tag1" } });
        fireEvent.keyDown(input, { key: "Enter" });

        fireEvent.change(input, { target: { value: "tag1" } });
        fireEvent.keyDown(input, { key: "Enter" });

        const tags = screen.getAllByText("tag1");
        expect(tags.length).toBe(1);
    });

    it("should remove tag when clicking 'X' button", () => {
        render(component);
        const input = document.getElementById('tag-input') as HTMLElement;

        fireEvent.change(input, { target: { value: "tag1" } });
        fireEvent.keyDown(input, { key: "Enter" });

        const removeButton = screen.getByText("X");
        fireEvent.click(removeButton);

        expect(screen.queryByText("tag1")).toBeFalsy();
    });
});
