### ระบบจัดการสินค้าอย่างง่าย
โปรเจคนี้สร้างขึ้นมาเพื่อทดสอบการสร้าง API ในการเรียกดู เพิ่ม แก้ไข และลบสินค้า โดยข้อมูลสินค้าถูกจัดเก็บในรูป array ของ object ใน local file และมี attibute 5 อย่างคือ id  name category  price และ stock ตัวอย่างของข้อมูลสินค้าเป็นดังนี้ \
product = { id: 1, name: "Laptop", category: "Electronics", price: 1000, stock: 5 } \
* id  เป็นข้อมูลประเภท number
* name เป็นข้อมูลประเภท string
* category เป็นข้อมูลประเภท string 
* price เป็นข้อมูลประเภท number ที่ต้องมีค่ามากกว่า 0 
* stock เป็นข้อมูลประเภท number ที่ต้องมีค่ามากกว่า 0 และเป็นจำนวนเต็ม 
### End point
**1. GET/Products** \
* เรียกดูสินค้าทั้งหมดที่มี

