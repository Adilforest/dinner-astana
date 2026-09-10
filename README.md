# Ужин на двоих — Астана

Статичный сайт: пять заведений, адреса со ссылками на 2ГИС, время работы, состав сетов,
фото сетов и посты заведений в Instagram.

## Файлы

```
index.html          разметка и все сеты
styles.css          оформление
app.js              переключение сетов + подгрузка Instagram
images/             фото сетов
```

## Локальный просмотр

Просто открой `index.html` в браузере. Встраивание Instagram работает только по http/https,
поэтому для проверки постов удобнее поднять локальный сервер:

```
python -m http.server 8000
```

## GitHub Pages

```
git init
git add .
git commit -m "site"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

Дальше Settings → Pages → Source: `Deploy from a branch`, ветка `main`, папка `/ (root)`.

## Cloudflare Pages

Dashboard → Workers & Pages → Create → Pages → Connect to Git → выбери репозиторий.
Сборка не нужна:

- Framework preset: `None`
- Build command: оставить пустым
- Build output directory: `/`
