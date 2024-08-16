import { THome, getMessage } from "../home.service";

jest.mock("../home.service");

let mockGetMessage = getMessage as unknown as jest.MockedFn<() => THome>;

afterEach(() => {
  mockGetMessage.mockClear();
});

describe("Home Unit Testing", () => {
  test("sample home success", async () => {
    mockGetMessage.mockReturnValue({
      message: "tes",
    });

    const data = await getMessage();

    expect(data.message).toBe("tes");
  });
});
