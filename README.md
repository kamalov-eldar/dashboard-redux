# Dashboard React App

### Стартовая страница с погодой и списком задач

![image](https://github.com/kamalov-eldar/dashboard-ts/blob/master/src/img/to-do.jpg)

> [!NOTE]
> Information the user should notice even if skimming.

## Функционал

> [!IMPORTANT]
> Скорость изменений в ToDo ограничена скоростью бесплатного сервера!

> [!WARNING]
> Разрешите браузеру получать данные о местположении, иначе функционал погоды не будет работать.

- Фон обновляется через 3 минуты и с каждым обновлением страницы
- Api погоды отображаются в соответствии с геолокацией пользователя
- Имя пользователя и данные геолакации сохраняются в Local Storage

## ToDo

- Задачи и все изм. сохраняются на сервер (https://repetitora.net/api/js/tasks?widgetid=987654)
- Максимальное кол-во возвращаемых задач = 5
- Используется Redux

### `npm start`

- запуск приложения локально

### `npm run build`

- компиляция/сборка приложения

### Deployment

### `npm run deploy` - сборка приложения и выложить на github.pages

готовый сайт -> https://kamalov-eldar.github.io/dashboard-redux
