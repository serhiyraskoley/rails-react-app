import { render } from "@testing-library/react";
import { fireEvent, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import NewPostForm from "./NewPostForm";
import { createPost } from "../../services/postService";

jest.mock("../../services/postService", () => ({  
  createPost: jest.fn(() => {
    return {
      id: 1,
      title: "Test Title",
      body: "Test Body",
    };
  }),
}));

describe("NewPostForm", () => {

  const renderForm = () => {
    render(
    <Router>
        <NewPostForm />
    </Router>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("render NewPostForm and allow typing", () => {
    renderForm();

    const titleInput = screen.getByLabelText(/Title:/i);
    const bodyInput = screen.getByLabelText(/Body:/i);
    const submitButton = screen.getByRole("button", { name: /create post/i });
    
    const expectedTitle = "Test Title";
    const expectedBody = "Test Body";

    fireEvent.change(titleInput, { target: { value: expectedTitle } });
    fireEvent.change(bodyInput, { target: { value: expectedBody } });
    
    expect(titleInput.value).toBe(expectedTitle);
    expect(bodyInput.value).toBe(expectedBody);
    expect(submitButton).toBeInTheDocument();
  });

  test("submits form and redirect to the post page", async () => {
    renderForm();

    const titleInput = screen.getByLabelText(/Title:/i);
    const bodyInput = screen.getByLabelText(/Body:/i);
    const submitButton = screen.getByRole("button", { name: /create post/i });

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(bodyInput, { target: { value: "Test Body" } });
    
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(createPost).toHaveBeenCalledTimes(1);
  });
  
  test("Display error message when post creation failed", async () => {
    createPost.mockRejectedValue(new Error("Failed to create post."));
    
    const consoleSpy = jest.spyOn(console, "error");
    consoleSpy.mockImplementation(jest.fn());
    
    renderForm();

    const titleInput = screen.getByLabelText(/Title:/i);
    const bodyInput = screen.getByLabelText(/Body:/i);
    const submitButton = screen.getByRole("button", { name: /create post/i });
  
    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(bodyInput, { target: { value: "Test Body" } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to create post: ",
      new Error("Failed to create post.")
    );
  });
});