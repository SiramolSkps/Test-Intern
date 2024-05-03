Precject requier:
Frontend => React Version 18.2.0 (Javascript) + 
Backend => (Javascript + Express)
Database => (MongoDB)
Nodejs. => Version 20.xx.x 

----------------------------------

วิธีการใช้งานสำหรับเครื่องทดสอบ ต้องมีการติดต้้งเครื่องมือดีงนี้
1. Install Node.js (Requied Version 20.xx.x) สามารถดาวน์โหลดได้ที่ https://nodejs.org/en/download

2. Install POSTMAN
3. Register MongoDB to create account
4. Intstall MUI สามารถดูรายละเอียดได้ที่ https://mui.com/material-ui/getting-started/installation/

------------------------------------

ฝั่ง server สามารถติดตั้ง package ทั้งหมดที่ใช้ด้วยคำสั่ง 
npm install express cors nodemon dotenv slugify morgan
npm install mongoose@6.0.12

ฝั่ง client
รันที่ port => REACT_APP_API=http://localhost:5500/api

------------------------------------------

วิธีการเชื่อมต่อกับ Database ใน mongoDB ที่ไฟล์ .env มีการกำหนดค่าดังนี้
PORT=5500
DATABASE=mongodb+srv://siramol_test_intern:BbPJHWkVrSSxGXF0@cluster0.lbeobmo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

