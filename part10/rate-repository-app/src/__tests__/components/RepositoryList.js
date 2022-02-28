import React from "react";
import {render} from "@testing-library/react-native";
import {RepositoryListContainer} from "../../components/RepositoryList.jsx";
import formatInThousands from "../../utils/formatInThousands";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      const {getByTestId} = render(
        <RepositoryListContainer repositories={repositories} />
      );

      const nodes = repositories.edges.map((edge) => edge.node);

      nodes.forEach(
        ({
          id,
          fullName,
          description,
          language,
          forksCount,
          stargazersCount,
          reviewCount,
          ratingAverage,
        }) => {
          const [formatStars, formatForks, formatReview, formatRating] = [
            stargazersCount,
            forksCount,
            reviewCount,
            ratingAverage,
          ].map(formatInThousands);
          expect(getByTestId(`${id}/fullName`)).toHaveTextContent(fullName);
          expect(getByTestId(`${id}/description`)).toHaveTextContent(description);
          expect(getByTestId(`${id}/lang`)).toHaveTextContent(language);
          expect(getByTestId(`${id}/Forks`)).toHaveTextContent(formatForks);
          expect(getByTestId(`${id}/Stars`)).toHaveTextContent(formatStars);
          expect(getByTestId(`${id}/Reviews`)).toHaveTextContent(formatReview);
          expect(getByTestId(`${id}/Rating`)).toHaveTextContent(formatRating);
        }
      );
    });
  });
});
