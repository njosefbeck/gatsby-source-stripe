const getNonRootFileNodeIds = require("../helpers/getNonRootFileNodeIds");

describe("getNonRootFileNodeIds()", () => {
  test("returns sub-object file node ids", () => {
    const fileNodeIds = [
      {
        location: "root",
        id: "8fa3f02d-5e34-5191-bf6a-7533210053fc",
      },
      {
        location: "product",
        id: "67735a50-5109-51be-85b4-803f05d27797",
      },
      {
        location: "product",
        id: "7bffbe3e-beed-5893-bc26-eaec9fc6d787",
      },
      {
        location: "product",
        id: "b9c3ae18-78f9-5b31-8e6b-372de7b6102a",
      },
    ];

    const expected = [
      {
        location: "product",
        id: "67735a50-5109-51be-85b4-803f05d27797",
      },
      {
        location: "product",
        id: "7bffbe3e-beed-5893-bc26-eaec9fc6d787",
      },
      {
        location: "product",
        id: "b9c3ae18-78f9-5b31-8e6b-372de7b6102a",
      },
    ];

    expect(getNonRootFileNodeIds(fileNodeIds)).toEqual(expected);
  });
});
