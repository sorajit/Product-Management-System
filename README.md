### ระบบจัดการสินค้าอย่างง่าย
โปรเจคนี้สร้างขึ้นมาเพื่อทดสอบการสร้าง API ในการเรียกดู เพิ่ม แก้ไข และลบสินค้า โดยข้อมูลสินค้าถูกจัดเก็บในรูป array ของ object ใน local file และมี attibute 5 อย่างคือ id  name category  price และ stock ตัวอย่างของข้อมูลสินค้าเป็นดังนี้ \
product = { id: 1, name: "Laptop", category: "Electronics", price: 1000, stock: 5 } 
* id  เป็นข้อมูลประเภท number
* name เป็นข้อมูลประเภท string
* category เป็นข้อมูลประเภท string 
* price เป็นข้อมูลประเภท number ที่ต้องมีค่ามากกว่า 0 
* stock เป็นข้อมูลประเภท number ที่ต้องมีค่ามากกว่า 0 และเป็นจำนวนเต็ม 
### End point
**1. GET/Products** 
* เรียกดูสินค้าทั้งหมดที่มี
<img width="709" alt="GET_allProducts" src="https://github.com/sorajit/Product-Management-System/assets/81581677/bc4c1a79-c66d-496e-ab9f-1cf8908ba061">

**2. GET/Products/:id** 
* เรียกดูสินค้าด้วย id ของสินค้า
<img width="695" alt="GET_productByID" src="https://github.com/sorajit/Product-Management-System/assets/81581677/cd6912b5-c72d-43fb-8ba0-c713b307b007">

**3. POST/Products** 
* เพิ่มข้อมูลสินค้าใหม่
* input คือ name  category  price และ stock
* ข้อมูล name  category และ price ของสินค้าใหม่จะต้องไม่ซ้ำกับสินค้าที่มีอยู่แล้ว หากซ้ำจะมี message แจ้งเตือนพร้อมบอก id ของสินค้าที่ซ้ำ
<img width="692" alt="Post_products" src="https://github.com/sorajit/Product-Management-System/assets/81581677/f846b185-fe0a-4fcd-84a9-65b9038a8863">

**4. PUT/Products/:id** 
* แก้ไขข้อมูลสินค้าที่มีอยู่แล้ว
* input คือ name  category  price และ stock
* ข้อมูล name  category และ price ของสินค้าที่แก้ไขจะต้องไม่ซ้ำกับสินค้าที่มีอยู่แล้ว หากซ้ำจะมี message แจ้งเตือนพร้อมบอก id ของสินค้าที่ซ้ำ
<img width="693" alt="Put_productsByID" src="https://github.com/sorajit/Product-Management-System/assets/81581677/96c8f329-017a-47c9-8ea6-ffc9621f7534">

**5. Delete/Products/:id** 
* ลบสินค้าด้วย id ของสินค้า
<img width="690" alt="Delete_productsByID" src="https://github.com/sorajit/Product-Management-System/assets/81581677/7089f4d8-c570-4ef7-b68a-442854a8d885">

