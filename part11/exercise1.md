# CI/CD Pipeline for a team of 6 with Odoo ERP

Odoo ERP is an Enterprise Resource Planning system written in Python, Javascript and XML. Here I will shortly go over a typical CI/CD pipeline for a small team of 6 people.

## CI Pipeline
### Linting

In any code collaboration it is a good idea to use a linter to make sure everyone follows a similar coding style and there are no "junk" in pull requests. By junk we mean changes made by a different linter to change the visual look of a code in pull requests without actually changing any of the logic. This creates unnecessary changes that are hard for a human to go through and see for any changes in logic.

For Odoo development it is a good idea is to follow [Odoo Community Association (OCA)](https://github.com/OCA/maintainer-tools) guidelines and include their code linting configurations for [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Black[(https://black.readthedocs.io/en/stable/), [Flake8](https://flake8.pycqa.org/en/latest/) and [Pylint Odoo plugin](https://github.com/OCA/pylint-odoo). This can easily be configured with [pre-commit](https://pre-commit.com/) to automatically run these linters before each commit as well as in a CI pipeline.

### Testing

Testing coverage for Odoo development can be achieved with [Travis CI](https://travis-ci.org/).

### Deployment

Deployment for Odoo applications is highly dependent on the environment where Odoo is deployed at, but Travis CI can be used here for simple deployment needs.

## CI Software

Typical CI software used for Odoo development are cloud-based solutions such as GitHub Actions or GitLab CI/CD. As there is no need for a build process when working with Odoo ERP it is not necessary to have a self-hosted setup with a more advanced platform such as [Jenkins](https://www.jenkins.io/)
