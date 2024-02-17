Delivery project:


before starting:

    PORTS:
        frontend port: 80
        backend port: 8080 

    1) .env file setup:
    
        DEBUG=True
        MYSQL_DATABASE=...
        MYSQL_USER=...
        MYSQL_PASSWORD=...
        MYSQL_ROOT_PASSWORD=...
        MYSQL_HOST=db
        MYSQL_PORT=3306

    2) pip install -r requirements.txt

    3) docker compose up --build

    4) Commands:

        cd /backend

        docker compose run --rm app sh 

        ./manage.py migrate



backend:
    поділений на 4 основні таблиці: (users, departments, deliveries, items) 

    В юзера є змога створити посилку (delivery) яка в свою чергу створює окрему модель предмету відправки (item).
    Кожна посилка має ForeignKey відділення на яке відправляється (department).
    Кожен юзер має унікальний номер телефону за яким здійснюються відправки.

    Якщо юзер відправляє посилку, вона з'вляється у відповідному полі "sending", так само якщо приймає, інформація вказана в "receiving".

    Delivery має статуси: (in_progress, ready, received, declined)
    
    Для проекту зробив оновлення статусу всіх посилок з інтервалом в 1 годину для імітації прибуття у відділення.
    (deliveries/services.py)  




frontend:
    Відтворив основні функції: (реєстрація, логінація, створення посилок, виведення посилок юзера, виведення всіх посилок).

    Кожна форма має валідацію.
    Стейт менеджер: Tanstack Query. 


    - Перед тим як створити посилку: 
        1. Створити мінімум 1 відділення зі статусом 'active'.
        2. Зареєструвати мінімум 2-ох юзерів.






