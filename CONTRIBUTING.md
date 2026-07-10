# Contributing to Cloud Resume Challenge Portfolio

First off, thank you for taking the time to contribute! This project is a production-grade showcase of modern, serverless cloud architectures combined with premium frontend design.

All types of contributions are welcome: fixing typos in documentation, suggesting optimizations for the AWS infrastructure, reporting bugs, or submitting pull requests for frontend improvements.

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please report any unacceptable behavior to [harshitapal5678@gmail.com](mailto:harshitapal5678@gmail.com).

## How Can I Contribute?

### 🐛 Reporting Bugs
* Check the [GitHub Issues](https://github.com/EngHarshita/cloud-resume-challenge/issues) to ensure the bug hasn't already been reported.
* Open a new issue with a clear title and description, including as much relevant information as possible (OS, browser, steps to reproduce, screenshots).

### 💡 Suggesting Enhancements
* Open an issue describing the proposed enhancement.
* Explain why this feature would be useful and how it aligns with the cloud/frontend goals of the project.

### 🔧 Submitting Code Changes (Pull Requests)
We follow a structured Git workflow to ensure code quality and maintainability.

#### 1. Fork and Clone
Fork the repository on GitHub, then clone your fork locally:
```bash
git clone https://github.com/your-username/cloud-resume-challenge.git
cd cloud-resume-challenge
```

#### 2. Branching Strategy
We use a lightweight Git Flow model:
* **`main`**: Production release code (what is deployed on AWS S3/CloudFront).
* **`develop`**: Integration branch for new features. All pull requests should target `develop`.
* **`feature/<name>`**: Short-lived branch for a specific feature or bug fix.

Create a new branch from `develop`:
```bash
git checkout develop
git checkout -b feature/your-feature-name
```

#### 3. Coding Standards
* **HTML/CSS/JS:** Keep code clean, semantic, and commented where necessary. Use modern CSS variables and flexbox/grid for layouts.
* **Python (Lambda):** Follow PEP 8 guidelines. Write handler code that is modular, handles exceptions gracefully, and includes logs for CloudWatch.
* **Aesthetics:** Ensure any UI changes align with the premium, glassmorphic theme.

#### 4. Conventional Commits
We enforce the [Conventional Commits specification](https://www.conventionalcommits.org/). Ensure your commit messages are structured as follows:

```text
<type>(<scope>): <description>

[optional body]
```

* **`feat`**: A new feature (e.g., `feat(lambda): add input sanitization to counter`)
* **`fix`**: A bug fix (e.g., `fix(css): resolve navigation overlapping on mobile`)
* **`docs`**: Documentation changes (e.g., `docs(readme): update deployment steps`)
* **`style`**: Visual or code formatting changes (e.g., `style(timeline): adjust padding values`)
* **`perf`**: Performance optimizations (e.g., `perf(js): throttle scroll event handler`)
* **`chore`**: Maintenance work (e.g., `chore(deps): update local development dependencies`)

#### 5. Submit a Pull Request
1. Push your branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```
2. Open a Pull Request on GitHub.
3. Set the target branch to **`develop`**.
4. Provide a clear description of the changes and link any related issues.
