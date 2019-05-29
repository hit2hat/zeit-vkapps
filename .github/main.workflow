workflow "CI/CD" {
  on = "push"
  resolves = ["Deploy to GitHub Pages"]
}

action "Install" {
  uses = "borales/actions-yarn@master"
  args = "install"
}

action "Build" {
  uses = "borales/actions-yarn@master"
  needs = ["Install"]
  args = "build"
}

action "Deploy to GitHub Pages" {
  uses = "JamesIves/github-pages-deploy-action@master"
  needs = ["Build"]
  env = {
    BRANCH = "gh-pages"
    FOLDER = "build"
  }
  secrets = ["ACCESS_TOKEN"]
}
