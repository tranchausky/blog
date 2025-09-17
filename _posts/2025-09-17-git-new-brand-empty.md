---
title: "Tạo một branch hoàn toàn trống (không có commit, không có lịch sử) trong Git"
date: 2025-07-23
layout: post
---

## Tạo một brand empty
```
git checkout --orphan empty
git rm -rf .
echo "# Empty branch" > README.md
git add README.md
git commit -m "Init empty branch"
```
