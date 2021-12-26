---
title: Dojo Content - Working Locally
description: Setup your machine to allow for contributing content locally.
globalcategory: contribute
---

# Overview

For small, grammar or spelling level corrections the easiest process to contribute the change directly on the [GitHub repository](https://github.com/geekdojo-ofc/geekdojo-com). However, for larger changes involving multiple content, hub, or landing pages, working locally can provide a substantial productivity boost. This guide will walk you through how to setup your local workstation to support contributing content back to the Dojo.

## Software Installs

The software installs below will greatly accelerate your editing process with the Dojo.

### 1. Sign-up for GitHub

Create an account [Github.com](https://github.com)

### 2. Install Visual Studio Code

Install the latest version of [Visual Studio Code (VSCode)](https://code.visualstudio.com/download).

### 3. Install the Doc Authoring Pack Extension

Install [Microsoft's Doc Authoring Pack](https://marketplace.visualstudio.com/items?itemName=docsmsft.docs-authoring-pack) via the Extensions menu.

### 4. Install Git

If not already done so, please install [Git CLI](https://git-scm.com/downloads) or [Github Desktop](https://desktop.github.com).

> **Note:**
> If you have never used Git it is highly recommended that you complete the [beginner tutorials](https://guides.github.com/activities/hello-world/). The manual for Git is also available [online](https://git-scm.com/docs/gittutorial).

## Working Locally

### 1. Fork geekdojo-com

1. In the GiHub user interface navigate to the [geekdojo-com](https://github.com/geekdojo-ofc/geekdojo-com) repository.
1. At the top right corner click **Fork**.
1. In the light window that pops up select your **username**. Doing so will create a copy under your user in GitHub. GitHub should redirect you to the newly created repository once it completes the Fork.
1. In the new Fork click the **Clone or download** button and copy the HTTPS URL out of the pop-up window. You will use this URL in the next step.

### 2. Clone Locally

In a Command (Windows) or Terminal (Mac) window, do the following:

1. Type and execute (by pressing Enter)

    ```powershell
    mkdir c:\src
    ```

2. Change to the new directory:

    ```powershell
    cd c:\src
    ```

3. Clone the Fork locally:

    ```powershell
    git clone <paste the URL from 1.4>
    ```
  
### 3. Open and Edit in VSCode

1. Now, open VSCode and click **Open Folder**.
1. Navigate to and Open the **src/geekdojo-com** directory.
1. Proceed to edit the content as needed.

### 4. Commit and Push Local Changes

1. In VSCode, select **Terminal** from the Menu and click **New Terminal**.
1. In the terminal window type and enter:

    ```bash
    git add --all
    ```

3. Then enter the following:

    ```bash
    git commit -s -m "<enter an appropriate message documenting the change>"
    ```

    **Note:** you *must* have the "-s" option to sign-off on your commit. You can read about signing off on opensource commits in [Github Docs](https://docs.github.com/en/github/authenticating-to-github/managing-commit-signature-verification/signing-commits).

4. Finally:

    ```bash
    git push
    ```

### 5. Submit a Pull Request

Navigate back to the [geekdojo-com](https://github.com/geekdojo-ofc/geekdojo-com) repository in GitHub and issue a Pull Request using the fork under your user account as the merge base.

## Reference

- [Pull Request guide](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) from GitHub.
