# Система аутентификации Firebase

## Описание

Реализована полная система аутентификации с использованием Firebase Auth и Firestore для приложения Junto.

## Файлы

### Клиентская часть (`src/сlient/firebase.js`)
- Конфигурация Firebase
- Функции аутентификации:
  - `loginUser(email, password)` - вход пользователя
  - `registerUser(email, password, username)` - регистрация пользователя
  - `logoutUser()` - выход из системы
  - `getCurrentUser()` - получение текущего пользователя
  - `onAuthStateChange(callback)` - отслеживание состояния аутентификации
  - `getUserData(userId)` - получение данных пользователя из Firestore

### Серверная часть (`src/server/firebase_server.js`)
- Инициализация Firebase Admin SDK
- Функции для работы с пользователями:
  - `createUser(email, password, displayName)` - создание пользователя
  - `getUserById(uid)` - получение пользователя по ID
  - `updateUserData(uid, userData)` - обновление данных пользователя
  - `deleteUser(uid)` - удаление пользователя
  - `verifyIdToken(idToken)` - проверка токена

### Компоненты React

#### Страницы аутентификации
- `src/pages/Login.jsx` - страница входа
- `src/pages/Register.jsx` - страница регистрации
- `src/pages/Profile.jsx` - профиль пользователя

#### Компоненты
- `src/components/ProtectedRoute.jsx` - защита маршрутов
- `src/components/LogoutButton.jsx` - кнопка выхода
- `src/components/Navigation.jsx` - навигация

#### Стили
- `src/pages/Auth.css` - стили для страниц аутентификации
- `src/pages/Profile.css` - стили для профиля
- `src/components/Components.css` - стили для компонентов

## Функциональность

### Регистрация
- Валидация полей (email, пароль, подтверждение пароля, имя пользователя)
- Минимальная длина пароля: 6 символов
- Создание пользователя в Firebase Auth
- Создание документа пользователя в Firestore
- Автоматический переход на главную страницу после успешной регистрации

### Вход
- Валидация email и пароля
- Обработка ошибок аутентификации
- Автоматический переход на главную страницу после успешного входа

### Защита маршрутов
- Компонент `ProtectedRoute` проверяет аутентификацию
- Неавторизованные пользователи перенаправляются на страницу входа
- Показ индикатора загрузки во время проверки аутентификации

### Профиль пользователя
- Отображение информации о пользователе
- Email, имя пользователя, дата регистрации
- Количество созданных и посещенных событий
- Кнопка выхода из системы

### Навигация
- Адаптивная навигационная панель
- Отображение email текущего пользователя
- Кнопка выхода
- Активные состояния для текущей страницы

## Использование

### Защита маршрута
```jsx
<Route 
  path="/protected" 
  element={
    <ProtectedRoute>
      <ProtectedComponent />
    </ProtectedRoute>
  } 
/>
```

### Использование функций аутентификации
```jsx
import { loginUser, registerUser, logoutUser } from '../сlient/firebase';

// Вход
const result = await loginUser(email, password);
if (result.success) {
  // Успешный вход
} else {
  // Ошибка
  console.error(result.error);
}

// Регистрация
const result = await registerUser(email, password, username);
if (result.success) {
  // Успешная регистрация
} else {
  // Ошибка
  console.error(result.error);
}

// Выход
const result = await logoutUser();
if (result.success) {
  // Успешный выход
}
```

### Отслеживание состояния аутентификации
```jsx
import { onAuthStateChange } from '../сlient/firebase';

useEffect(() => {
  const unsubscribe = onAuthStateChange((user) => {
    if (user) {
      // Пользователь авторизован
    } else {
      // Пользователь не авторизован
    }
  });

  return () => unsubscribe();
}, []);
```

## Требования

- Firebase проект с включенной аутентификацией по email/password
- Firestore база данных
- Файл `credentials.json` для серверной части (Firebase Admin SDK)
- Установленные зависимости: `firebase`, `react-router-dom`

## Безопасность

- Валидация данных на клиентской стороне
- Проверка токенов на серверной стороне
- Защита маршрутов от неавторизованного доступа
- Безопасное хранение паролей (Firebase Auth)
- Правила безопасности Firestore для защиты данных пользователей 