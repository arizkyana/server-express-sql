import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { getUsers } from "../user.service";

jest.mock("../../data-source");

const mockAppDataSource = AppDataSource as unknown as jest.Mocked<DataSource>;

afterEach(() => {
  mockAppDataSource.getRepository.mockClear();
});

describe("User Unit Testing", () => {
  test("get all users", async () => {
    mockAppDataSource.getRepository.mockReturnValue({
      find() {
        return Promise.resolve([
          {
            age: 10,
            firstName: "AAA",
            id: 1,
            lastName: "BBB",
          },
        ] as User[]);
      },
    } as any);

    const users = await getUsers();

    expect(users.length).toBe(1);
  });
});
