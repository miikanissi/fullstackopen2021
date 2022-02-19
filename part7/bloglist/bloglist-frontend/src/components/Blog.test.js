import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {render, fireEvent} from "@testing-library/react";
import Blog from "./Blog";
import blogService from "../services/blogs";

describe("<Blog />", () => {
  let component;
  let sampleBlog = {
    title: "Testing Blog",
    author: "Miika Nissi",
    url: "https://miikanissi.com",
    likes: 30,
    user: "61ff0f26254f61ed1d2f6eae",
  };

  let mockHandler = jest.fn();

  blogService.update = jest.fn().mockImplementation(() => {
    return Promise.resolve({success: true});
  });

  beforeEach(() => {
    component = render(<Blog blog={sampleBlog} handleLikes={mockHandler} />);
  });

  test("renders title and author by default", () => {
    expect(component.container).toHaveTextContent(sampleBlog.title);
    expect(component.container).toHaveTextContent(sampleBlog.author);
    expect(component.container).not.toHaveTextContent(sampleBlog.likes);
    expect(component.container).not.toHaveTextContent(sampleBlog.url);
  });

  test("renders likes and url after button press", () => {
    fireEvent.click(component.getByText("view"));
    expect(component.container).toHaveTextContent(sampleBlog.likes);
    expect(component.container).toHaveTextContent(sampleBlog.url);
  });

  test("like button pressed twice", () => {
    const viewButton = component.getByText("View");
    fireEvent.click(viewButton);
    const likeButton = component.getByText("Like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
