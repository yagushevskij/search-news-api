# Backend [сервиса поиска новостей](https://news-explorer.turbomegapro.ru/), v.1.0.8

## Описание проекта
Учебная дипломная работа [яндекс.практикум](https://praktikum.yandex.ru/) по разработке API для сервиса поиска новостей.
Данное приложение написано на фреймворке Express.js, осуществляет обработку различных запросов, таких как:
- регистрация и авторизация пользователей с помощью cookies;
- сохранение и удаление новостей;
- получение информации о пользователе.
Для хранения данных используется БД MongoDB.

Чтобы обезопасить приложение реализовано:
- фильтрация спецсиволов и их замена на мнемоники (пакет escape-html);
- пароли хешируются хранятся на сервере в зашифрованном виде (пакет bcryptjs);
- для аутентификации пользователей в сервисе используется JWT токен, который хранится httpOnly куке;
- фильтрация запросов мидлвэром express-rate-limit - защита от автоматических запросов (DDoS, брутфорс)
- настроены HTTP заголовки (модуль helmet)
Все входящие на сервер данные валидируются промежуточным обработчиком celebrate до записи в БД перед передачей контроллеру, что повышает производительность и безопасность приложения.

## Инструкция по запуску
Для запуска приложения требуется наличие на компьютере [менеджера пакетов NPM](https://nodejs.org/en/download/) и [MongoDB](https://www.mongodb.com/download-center/community?jmp=docs)
1) Скопируйте код на свой компьютер;
2) Выполните установку пакетов с помощью команды
>npm install
3) Запустите приложение командой
>npm run start
Приложение запустится и будет доступно по URL http://localhost:3000/
4) Отправляйте запросы (например при помощи [postman](https://www.postman.com/) ):
- Создать пользователя:
>POST localhost:3000/signup/
{
        "username": "User",
        "email": "mail@mail.ru",
        "password": "querty12345"
}
- Авторизация:
>POST localhost:3000/signin/
{
        "email": "mail@mail.ru",
        "password": "querty12345"
}
- Логаут:
> GET localhost:3000/users/logout/
- Сохранить карточку:
> POST localhost:3000/articles/
{
    "keyword": "Superkey",
    "title": "Meganews",
    "text": "Omg omg omg",
    "date": "2021-01-02",
    "source": "Gazeta",
    "link": "http://site.ru",
    "image": "https://site.ru/img.jpg"
}
- Удалить карточку:
> DELETE localhost:3000/articles/ID_вашей_карточки


## Дополнительная информация
Демка API:
- IP адрес API: 159.69.145.176
- Так же API работает на доменах: https://news-explorer-api.turbomegapro.ru http://news-explorer-api.turbomegapro.ru

## Используемые технологии
- Node.js, Express.js, MongoDB
