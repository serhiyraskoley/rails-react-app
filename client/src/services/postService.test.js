import fetchMock from "jest-fetch-mock";
import {
  fetchAllPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost,
} from "./postService";

fetchMock.enableMocks();

jest.mock("../constants", () => ({
  API_URL: "http://your-test-api-url",
}))
  
describe("Post API Service", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  // Index
  it("fetch all posts", async () => {
    const mockData = [{ id: 1, title: "Test Post", body: "Test Body" }];
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const result = await fetchAllPosts();
    expect(result).toEqual(mockData);
  });
  // Show
  it("fetch a single post", async () => {
    const mockPostID = 1;
    const mockData = { id: 1, title: "Test Post", body: "Test Body" };
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const result = await fetchPost(mockPostID);
    expect(result).toEqual(mockData);
    });
  // Create
    it("cerate a new post", async () => {
    const mockPostID = 1;
    const mockData = { title: "Test Post", body: "Test Body" };
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const result = await createPost(mockPostID);
    expect(result).toEqual(mockData);
    });
  // Edit
  // Update
  it("update a post", async () => {
    const mockPostID = 1;
    const mockData = { id: 1, title: "Test Post", body: "Test Body" };
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const result = await updatePost(mockPostID, mockData);
    expect(result).toEqual(mockData);
  });
  // Delete
  it("delete a post", async () => {
    const mockPostID = 1;
    fetch.mockResponseOnce(null, { status: 204 });

    const result = await deletePost(mockPostID);
    expect(result).toEqual(null);
  });
  // Error messages
  it("returns an error message when fetch all posts fails", async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

    await expect(fetchAllPosts()).rejects.toThrow();
  });
  it("returns an error message when fetch a single post fails", async () => {
    const mockPostID = 1;
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

    await expect(fetchPost(mockPostID)).rejects.toThrow();
  });
  it("returns an error message when create a new post fails", async () => {
    const mockData = [{ title: "Test Post", body: "Test Body" }];
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

    await expect(createPost(mockData)).rejects.toThrow();
  });
  it("returns an error message when update a post fails", async () => {
    const mockPostID = 1;
    const mockData = { id: 1, title: "Test Post", body: "Test Body" };
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

    await expect(updatePost(mockPostID, mockData)).rejects.toThrow();
  });
  it("returns an error message when delete a post fails", async () => {
    const mockPostID = 1;
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

    await expect(deletePost(mockPostID)).rejects.toThrow();
  });
  it("return an error message when response is not ok & not 204", async () => {
    const mockPostID = 1;
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

    await expect(deletePost(mockPostID)).rejects.toThrow();
  });
})