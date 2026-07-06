import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "@/components/ui/label/label";

describe("RadioGroup", () => {
  function renderGroup(onValueChange?: (v: string) => void) {
    return render(
      <RadioGroup onValueChange={onValueChange}>
        <div>
          <RadioGroupItem value="a" id="a" />
          <Label htmlFor="a">Option A</Label>
        </div>
        <div>
          <RadioGroupItem value="b" id="b" />
          <Label htmlFor="b">Option B</Label>
        </div>
        <div>
          <RadioGroupItem value="c" id="c" disabled />
          <Label htmlFor="c">Option C</Label>
        </div>
      </RadioGroup>
    );
  }

  it("renders radio items", () => {
    renderGroup();
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
  });

  it("selecting an item changes value", async () => {
    renderGroup();
    const radioA = screen.getByRole("radio", { name: "Option A" });
    await userEvent.click(radioA);
    expect(radioA).toBeChecked();
  });

  it("calls onValueChange when an item is selected", async () => {
    const onValueChange = vi.fn();
    renderGroup(onValueChange);
    await userEvent.click(screen.getByRole("radio", { name: "Option B" }));
    expect(onValueChange).toHaveBeenCalledWith("b");
  });

  it("disabled item cannot be selected", async () => {
    const onValueChange = vi.fn();
    renderGroup(onValueChange);
    const disabledRadio = screen.getByRole("radio", { name: "Option C" });
    await userEvent.click(disabledRadio);
    expect(onValueChange).not.toHaveBeenCalledWith("c");
  });
});
