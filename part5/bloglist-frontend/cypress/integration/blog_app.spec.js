describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Miika Nissi",
      username: "mnissi",
      password: "password",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("log in").click();
    cy.contains("Login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("log in").click();
      cy.get("#username").type("root");
      cy.get("#password").type("password");
      cy.get("#login-button").click();

      cy.get(".notification")
        .should("contain", "Miika Nissi logged in.")
        .and("have.css", "color", "green");
    });

    it("fails with wrong credentials", function () {
      cy.contains("log in").click();
      cy.get("#username").type("root");
      cy.get("#password").type("wrongpassword");
      cy.get("#login-button").click();

      cy.get(".notification")
        .should("contain", "wrong username or password. Please try again.")
        .and("have.css", "color", "red");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/login", {
        username: "mnissi",
        password: "password",
      }).then((response) => {
        localStorage.setItem("loggedUser", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
      });
    });

    it("A blog can be created", function () {
      cy.contains("Create Blog").click();
      cy.get("#title").type("Miika's Blog");
      cy.get("#author").type("Miika Nissi");
      cy.get("#url").type("https://miikanissi.com");
      cy.get("#likes").type(100);
      cy.get("#create-blog").click();

      cy.contains("Miika's Blog");
    });

    describe("and a blog exist", function () {
      beforeEach(function () {
        const body = {
          title: "Miika's Blog",
          author: "Miika Nissi",
          url: "https://miikanissi.com",
          likes: 100,
        };
        cy.createBlog(body);
      });

      it("user like a blog", function () {
        cy.contains("View").click();
        cy.get(".like").click();
      });

      it("user who created the blog can delete it", function () {
        cy.contains("View").click();
        cy.get(".remove").click();
        cy.on("windows:confirm", () => true);
      });

      describe("add a few more blogs", function () {
        beforeEach(function () {
          const blog1 = {
            title: "Miika's News",
            author: "Miika Nissi",
            url: "https://miikanissi.com",
            likes: 4,
          };
          const blog2 = {
            title: "Miika's Cooking",
            author: "Miika Nissi",
            url: "https://miikanissi.com",
            likes: 12,
          };
          cy.createBlog(blog1);
          cy.createBlog(blog2);
        });

        it("and the first blog has maximum likes", function () {
          cy.contains("view").click();
          cy.get(".like").parent().as("likeblock");
          cy.get("@likeblock").contains(5);
        });
      });
    });
  });
});
