# simple-crud-api

Приложение представляет из себя простейший CRUD API для работы с объектами Person, имеющими формат

```
id — уникальный идентфикатор (string, uuid)
username — имя (string, required)
age — возраст (number, required)
hobbies — список хобби (array of strings or empty array, required)
```
## Пример запроса body:
```
{
    "username": "test name",
    "age": 55,
    "hobbies": ["programming","testing"]
}
```

## Установка приложения

```
git clone {repository URL}
```

```
npm install или npm i
```

## Запуск приложения

Запуск приложения в режиме разработки

```
npm run start:dev
```
## Запуск в режиме релиза

```
npm run start:prod
```
Приложение прослушивает порт, указанный в .env (4000 по умолчанию). Вы можете указать другой. 
Проверять работу приложения удобно с помощью Postman. Его можно установить себе на компьютер или использовать расширение для Chrome.

## Тестирование
```
npm run test
```

Реализовано 3 сценария: 
1. Работа с 1 элементом данных
2. Работа с массивом данных
3. Проверка ошибок

## Scaling
```
npm run start:multi
```
