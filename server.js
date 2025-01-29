const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');

const bcrypt = require('bcryptjs');
const session = require('express-session');
require('dotenv').config();

const app = express();
const coreRoutes = require('./core.js');

app.use('/api', coreRoutes);
const exchangeAPIKey = 'a1942e41890ac578245ee2c7';
const newsAPIKey = '3ce6b2cc2ee8491496fb2f93dbba239c';
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Настройка сессий
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'default_secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // Сессия действует 1 день
            httpOnly: true,
        },
    })
);

// Настройка EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Подключение к MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
    const dataSchema = new mongoose.Schema({
        data: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    });
    
    const DataModel = mongoose.model('Data', dataSchema);
    
// Схема и модель пользователя
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    deletedAt: { type: Date, default: null },
});

const User = mongoose.model('User', userSchema);
// Определение схемы для хранения запросов
const requestSchema = new mongoose.Schema({
    userData: String,
    exchangeData: Object,
    newsData: Object,
    timestamp: Date
});
  
const Request = mongoose.model('Request', requestSchema);
  
// Middleware для проверки авторизации
function isAuthenticated(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
}

// Middleware для проверки прав администратора
function isAdmin(req, res, next) {
    if (!req.session.isAdmin) {
        return res.status(403).send('Access denied');
    }
    next();
}

// Маршруты

// Главная страница (логин)
app.get('/', (req, res) => res.redirect('/login'));

app.get('/login', (req, res) => {
    console.log('GET /login called');
    res.render('index', { title: 'Login' });
});

app.post('/login', async (req, res) => {
    console.log('POST /login called');
    const { email, password } = req.body;

    console.log(`Email: ${email}, Password: ${password ? '***' : 'Not Provided'}`);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Login failed: User not found');
            return res.status(401).send('Invalid email or password');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.log('Login failed: Incorrect password');
            return res.status(401).send('Invalid email or password');
        }

        req.session.userId = user._id;
        req.session.isAdmin = user.admin;

        console.log('Login successful:', { email, isAdmin: user.admin });

        res.redirect(user.admin ? '/admin' : '/front');
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).send('Error logging in');
    }
});

// Регистрация
app.get('/register', (req, res) => res.render('reg', { title: 'Register' }));

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    console.log('POST /register called');
    console.log(`Received data: username=${username}, email=${email}, passwordLength=${password.length}`);

    if (!password || password.length < 6) {
        console.log('Registration failed: Password too short');
        return res.status(400).send('Password must be at least 6 characters long');
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log(`Registration failed: Email ${email} already in use`);
            return res.status(400).send('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Password hashed successfully for email: ${email}`);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        console.log(`User created successfully: ${username} (${email})`);

        req.session.userId = newUser._id;
        req.session.isAdmin = newUser.admin;
        console.log(`Session created: userId=${newUser._id}, isAdmin=${newUser.admin}`);

        res.redirect('/front'); // После регистрации перенаправляем на /front
    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).send('Error registering user');
    }
});

// Профиль пользователя
app.get('/profile', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('profile', { title: 'Profile', user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving profile');
    }
});
app.post('/getData', async (req, res) => {
    const userInput = req.body.userInput.toUpperCase(); 

    try {
        const exchangeResponse = await axios.get(
            `https://v6.exchangerate-api.com/v6/${exchangeAPIKey}/latest/${userInput}`
        );
        const newsResponse = await axios.get(
            `https://newsapi.org/v2/everything?q=${userInput}&apiKey=${newsAPIKey}`
        );

        const newRequest = new Request({
            userData: userInput,
            exchangeData: exchangeResponse.data,
            newsData: newsResponse.data,
        });
        await newRequest.save();

        res.render('dataPage', {
            userInput,
            exchangeData: exchangeResponse.data,
            newsData: newsResponse.data,
        });
    } catch (error) {
        console.error('Ошибка при получении данных с API:', error.message);
        res.status(500).send('Ошибка при получении данных');
    }
});

  
// Маршрут GET для отображения данных на странице dataPage
app.get('/dataPage', async (req, res) => {
    const userInput = req.query.userInput;
  
    try {
      // Ищем данные в MongoDB по введенному значению
      const requestData = await Request.findOne({ userData: userInput }).sort({ timestamp: -1 }).limit(1);
  
      if (!requestData) {
        return res.render('dataPage', {
          userData: userInput,
          exchangeData: null,
          newsData: null,
          message: 'Данные не найдены'
        });
      }
  
      // Отображаем найденные данные
      res.render('dataPage', {
        userData: requestData.userData,
        exchangeData: requestData.exchangeData,
        newsData: requestData.newsData,
        message: null
      });
    } catch (error) {
      console.error('Ошибка при поиске данных', error);
      res.status(500).send('Ошибка при поиске данных');
    }
});

// Панель администратора
app.get('/admin', isAuthenticated, isAdmin, async (req, res) => {
    try {
        // Получение всех пользователей из базы
        const users = await User.find();
        res.render('admin', { title: 'Admin Page', users });
    } catch (err) {
        console.error('Ошибка при загрузке админской страницы:', err.message);
        res.status(500).send('Ошибка сервера при загрузке админской страницы');
    }
});
// Добавление пользователя через админку
app.post('/admin/add', isAuthenticated, isAdmin, async (req, res) => {
    const { username, email, password, admin } = req.body;

    // Проверяем, что все необходимые данные переданы
    if (!username || !email || !password) {
        return res.status(400).send('Все поля обязательны для заполнения');
    }

    try {
        // Проверяем существование пользователя с таким же email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Пользователь с таким email уже существует');
        }

        // Хэшируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаём нового пользователя
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            admin: admin === 'on', // Преобразуем значение чекбокса в булево
        });

        await newUser.save();
        res.redirect('/admin'); // Перенаправляем на админскую страницу
    } catch (err) {
        console.error('Ошибка при добавлении пользователя:', err.message);
        res.status(500).send('Ошибка сервера при добавлении пользователя');
    }
});

// Редактирование пользователя через админку
app.post('/admin/edit/:id', isAuthenticated, isAdmin, async (req, res) => {
    const { username, email, password, admin } = req.body;

    // Проверяем наличие необходимых данных
    if (!username || !email) {
        return res.status(400).send('Имя пользователя и email обязательны');
    }

    try {
        // Формируем обновляемые данные
        const updates = {
            username,
            email,
            admin: admin === 'on', // Преобразуем значение чекбокса в булево
        };

        // Если передан новый пароль, хэшируем его
        if (password) {
            updates.password = await bcrypt.hash(password, 10);
        }

        // Обновляем пользователя
        await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        res.redirect('/admin'); // Перенаправляем на админскую страницу
    } catch (err) {
        console.error('Ошибка при редактировании пользователя:', err.message);
        res.status(500).send('Ошибка сервера при редактировании пользователя');
    }
});

// Удаление пользователя через админку
app.post('/admin/delete/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send('Пользователь не найден');
        }

        await User.findByIdAndDelete(req.params.id); // Удаляем пользователя
        res.redirect('/admin');
    } catch (err) {
        console.error('Ошибка при удалении пользователя:', err.message);
        res.status(500).send('Ошибка сервера при удалении пользователя');
    }
});


// Страницы фронта
app.get('/front', isAuthenticated, (req, res) => res.render('front', { title: 'Front' }));
app.get('/catalog', isAuthenticated, (req, res) => res.render('catalog', { title: 'Catalog' }));
app.get('/basket', isAuthenticated, (req, res) => res.render('basket', { title: 'Basket' }));
app.get('/edit_profile', isAuthenticated, (req, res) => res.render('edit_profile', { title: 'Edit Profile' }));

// Выход
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error logging out');
        }
        res.redirect('/login');
    });
});

app.get('/history', async (req, res) => {
    try {
        const history = await Request.find().sort({ timestamp: -1 }).limit(20);
        res.render('history', { title: 'Request History', history });
    } catch (error) {
        console.error("Error loading history page:", error);
        res.status(500).send("Error loading history page");
    }
});


// Старт сервера
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));