# Contributing to First Pull Request

Thank you for your interest in contributing to Project Name!

Below is step-by-step instruction how to fix a bug in our javascript code. 
If something is still unclear please ask questions in [https://github.com/alex1yaremchuk/first-pull-request/discussions](discussions). 

Basic contributing (ammending text/changeme.md file) is described in [CONTRIBUTING-LIGHT.md].

1. **Fork the Repository**: Click the "Fork" button at the top right of this page to create a copy of this repository under your GitHub account.

2. **Clone Your Fork**:
    ```sh
    git clone https://github.com/your-username/project-name.git
    cd project-name
    ```

3. **Make a new branch**: Name it as you like, f.i. fix/my-first-fix.
    ```sh
    git checkout -b fix/my-first-fix
    ```

4. **Install Dependencies**:
After you forked and clonned the repo, you're ready to install Node.js dependencies of this project.
    ```sh
    cd javascript
    npm install
    ```

5. **Fix the bug**:
Fix the issue in the code.

6. **Run Tests and Linting locally**:
Make sure testing and linting is successful after your change.
    ```sh
    npm test
    npm run lint
    ```

7. **Commit Your Changes**:
Change commit message mentioning your issue number (it allows auto-closing of the issue when PR is merged).
    ```sh
    git add .
    git commit -m "fix: Fixes issue#N"
    ```

8. **Push the changes**: This step will push your changes to your forked repository.
(Still need to put changes to this original repo with PR!)

    ```sh
    git push
    ```
9. **Create a Pull Request**: GitHub will show a banner at the top of your repo's main page saying that there is a branch and suggesting to create a PR for it.
Or you could go to "Pull requests" tab and create new pull request there.

10. **Follow your PR**: In some time we will approve and merge your pull request.
You'll see your changes in this repo and your name among contributors.
And [https://alex1yaremchuk.github.io/first-pull-request/index.html](this page) shows more decent arithmetics.

11. **Merge Conflicts (hopefully not!)**: If it happens that upstream repo went forward by the time your changes are ready to be merged, then you'll need to merge or rebase your changes. 
If it sounds too much then you can simply abandon your current branch and PR and create a new one (repeat from step 3).
Just don't forget to pull recent changes from upstream with the following commands. 

## Code of Conduct

Please adhere to the [Code of Conduct](CODE_OF_CONDUCT.md) in all your interactions with the project.

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.
