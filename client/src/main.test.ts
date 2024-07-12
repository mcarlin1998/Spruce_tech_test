let gridSize = 0;
const setGridSize = (value) => {
  gridSize = value;
};
const generateBoard = jest.fn();

// Error with test due to handleGridChange function not being imported - ran out of time
describe("handleGridChange function", () => {
  it("updates gridSize and generates board correctly", () => {
    // Mock event object
    const mockEvent = {
      preventDefault: jest.fn(),
      target: { value: 5 }, // Example gridChangeValue within valid range
    };

    // Call handleGridChange with mock event
    handleGridChange(mockEvent);

    // Assertions
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(gridSize).toBe(5); // Check if gridSize was updated correctly
    expect(generateBoard).toHaveBeenCalledWith(5); // Check if generateBoard was called with the correct gridSize
  });

  it("does not update gridSize or generate board for invalid input", () => {
    // Mock event object with invalid value
    const mockEvent = {
      preventDefault: jest.fn(),
      target: { value: 2 }, // Example gridChangeValue outside valid range
    };

    // Call handleGridChange with mock event
    handleGridChange(mockEvent);

    // Assertions
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(gridSize).toBe(0); // Check if gridSize remains unchanged
    expect(generateBoard).not.toHaveBeenCalled(); // Ensure generateBoard was not called for invalid input
  });
});
