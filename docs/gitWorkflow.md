## 🚀 Team Git Workflow Guide

### 🧠 Summary
This guide defines the Git branching strategy and daily workflow for our project using **Expo**, **VSCode**, and **GitHub**.

---

## 🗂️ Branching Strategy

| Branch        | Purpose                        |
|---------------|--------------------------------|
| `main`        | Stable, production-ready code  |
| `develop`     | Integration branch for features |
| `feature/*`   | Individual task branches        |
| `bugfix/*`    | Fixes to be merged to `develop` |
| `hotfix/*`    | Urgent fixes directly to `main` |

---

## 🧑‍💻 Developer Daily Workflow

### 1. ⬇️ Sync with latest `develop`
```bash
git checkout develop
git pull origin develop
```

### 2. 🌱 Create a feature branch
```bash
git checkout -b feature/your-task-name
```

> Branch naming examples:
> - `feature/login-screen`
> - `bugfix/fix-login-error`

---

### 3. 🛠️ Work on your task
- Make changes in VSCode
- Regularly commit:
```bash
git add .
git commit -m "feat: add login screen layout"
```

---

### 4. 📤 Push your branch
```bash
git push origin feature/your-task-name
```

---

### 5. 🔁 Open a Pull Request (PR)
On GitHub:
- Base: `develop` ✅
- Compare: `feature/your-task-name`
- Add PR title & description
- Link issue with `Closes #issue-number`
- Assign a reviewer (usually the PM)

---

### 6. 👀 Request Review
Ask for review in Slack or tag on GitHub.

---

### 7. ✅ PM merges into `develop`
- Reviewer merges when approved
- Delete branch after merge (GitHub can auto-delete)

---

### 8. 🧹 Clean up local branches
```bash
git checkout develop
git pull origin develop
git branch -d feature/your-task-name
```

If the branch was deleted remotely:
```bash
git branch -D feature/your-task-name
```

---

## 🔀 Merging `develop` → `main`

Only the **PM** or release owner does this when:
- Features are tested and stable
- It’s time to release

```bash
git checkout main
git pull origin main
git merge develop
git push origin main
```

✅ Optionally use a `release/*` branch if you want a reviewable PR into `main`.

---

## 🔥 Hotfixes (emergency patches)

1. Create a branch from `main`:
```bash
git checkout main
git pull origin main
git checkout -b hotfix/fix-crash
```

2. After fix:
```bash
git add .
git commit -m "hotfix: fix crash issue"
git push origin hotfix/fix-crash
```

3. Open PR → **base: `main`**, merge, then back-merge into `develop`:
```bash
git checkout develop
git pull origin develop
git merge main
```

---

## 🏷️ Optional GitHub Labels

- `feature`
- `bugfix`
- `review-needed`
- `ready-to-merge`

---

## 💡 Tips

- Use [GitHub Issues](https://github.com/) to assign tasks
- Link Issues to PRs using `Closes #123`
- Protect `main` and `develop` branches via GitHub Settings
- Consider using [GitHub Actions](https://docs.github.com/en/actions) to run tests or Expo builds on PR

---
