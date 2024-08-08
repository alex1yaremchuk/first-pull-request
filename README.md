# First Pull Request

Welcome to the First Pull Request! 
This repository is a sandbox for new developers to practice their first pull requests and participation in (contribution to) an open-source project.

## Overview

This project was born when I decided that I want to participate in some OS project, but was a bit scared by real ones, even those marked as being friendly to newcomers.

I decided to make a dedicated GitHub repo which will always have a toy issue and which will welcome pull requests. 

## Features

- Practice forking and cloning repos
- Practice on making some changes to the codebase
- Optionally practice with running unit tests
- Practice creating pull requests
- Check out the results of CI with linting and testing
- See your PR being accepted 
- See your name among contributors!

## Getting Started

Simplest path to contribute to the project would be to modify our text file text/changeme.md. 
It won't demand running any tests or checks and there is no automatic filter for changes (at least for now).

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

8. **Follow your PR**: In some time we will approve and merge your pull request.

9. **Merge Conflicts**: If it happens that upstream repo went forward by the time your changes are ready to be merged, then you'll need to merge or rebase your changes. 
If it sounds too much then you can simply abandon your current branch and PR and create a new one (repeat from step 3).
Just don't forget to pull recent changes from upstream with the following commands. 


    ```sh
    git remote add upstream https://github.com/alex1yaremchuk/first-pull-request.git

    git pull upstream main
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.