import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {render, fireEvent} from "@testing-library/react";
import BlogForm from "./BlogForm";

test("test creating new blog", () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");
  const likes = component.container.querySelector("#likes");
  const form = component.container.querySelector("form");

  fireEvent.change(title, {
    target: {value: "Miika's Blog"},
  });

  fireEvent.change(author, {
    target: {value: "Miika Nissi"},
  });

  fireEvent.change(url, {
    target: {value: "https://miikanissi.com"},
  });

  fireEvent.change(likes, {
    target: {value: 100},
  });

  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("Miika's Blog");
  expect(createBlog.mock.calls[0][0].author).toBe("Miika Nissi");
  expect(createBlog.mock.calls[0][0].url).toBe("https://miikanissi.com");
  expect(createBlog.mock.calls[0][0].likes).toBe("100");
});
