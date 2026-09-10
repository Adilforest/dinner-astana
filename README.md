# Ужин на двоих — Астана

Статичный сайт: пять заведений, адреса со ссылками на 2ГИС, время работы, состав сетов,
фото сетов и посты заведений в Instagram.

## Файлы

```
public/index.html    разметка и все сеты
public/styles.css    оформление
public/app.js        переключение сетов + подгрузка Instagram
public/images/       фото сетов
wrangler.jsonc       конфиг деплоя на Cloudflare Workers
```

## Локальный просмотр

Встраивание Instagram работает только по http или https, поэтому лучше поднять сервер:

```
cd public
python -m http.server 8000
```

## Деплой на Cloudflare Workers

В панели Cloudflare: Workers & Pages → Create → Import a repository → `dinner-astana`.

- Build command: `npx wrangler deploy`
- Deploy command: оставить пустым, деплой уже входит в команду сборки

Из терминала то же самое делается так:

```
npx wrangler deploy
```

## Деплой на GitHub Pages

Settings → Pages → Deploy from a branch → `main`. Учти, что Pages отдаёт корень
репозитория, а сайт лежит в `public`, поэтому этот вариант потребует переноса файлов в корень.
