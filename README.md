# Backend сервиса NewsExplorer, v.1.0.8

## Описание проекта
Серверная часть сервиса NewsExplorer - поиска мировых новостей.
Данное приложение написано на фреймворке express, осуществляет обработку различных запросов, таких как:
- регистрация и авторизация пользователей;
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


## Дополнительная информация
Ознакомиться с работой данного API можно на удаленном сервере:
- IP адрес: 159.69.145.176
- URLs: https://news-explorer-api.turbomegapro.ru http://news-explorer-api.turbomegapro.ru

## Используемые технологии
- node.js, express, mongo
