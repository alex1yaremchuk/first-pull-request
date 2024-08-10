# Contributing to First Pull Request - light version

Thank you for your interest in contributing to Project Name!

Below is step-by-step instruction how to make your changes in this repo's 'text/changeme.md' file. 
If something is still unclear please ask questions in [discussions](https://github.com/alex1yaremchuk/first-pull-request/discussions). 

More advanced contribution is described in [CONTRIBUTING.md].

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

4. **Edit the file**: Edit text/changeme.md with the editor of your choice. For example write there your name or where you're from.
Adding or removing files is not allowed for now and will be blocked by CI workflow.

5. **Commit the changes**: Commit changes to your local repo with a commit message of your choice (f).

    ```sh
    git commit -am 'fix: fixing the text of a file'
    ```
6. **Push the changes**: This step will push your changes to your forked repository.
(Still need to put changes to this original repo with PR!)

    ```sh
    git push
    ```
7. **Create a Pull Request**: GitHub will show a banner at the top of your repo's main page saying that there is a branch and suggesting to create a PR for it.
Or you could go to "Pull requests" tab and create new pull request there.
Pull request is a suggestion for repo owner to include your changes into the repo.

8. **Follow your PR**: We will review and merge your pull request in due course.
You'll see your changes in this repo and your name among contributors.

9. **Merge Conflicts (hopefully not!)**: If it happens that upstream repo went forward by the time your changes are ready to be merged, then you'll need to merge or rebase your changes. 
    ```sh
    git remote add upstream https://github.com/alex1yaremchuk/first-pull-request.git

    git pull upstream main
    ```
If it sounds too much then you can simply abandon your current branch and PR and create a new one (repeat from step 3).
Just don't forget to pull recent changes from upstream with the following commands. 

## Code of Conduct

Please adhere to the [Code of Conduct](CODE_OF_CONDUCT.md) in all your interactions with the project.

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.
