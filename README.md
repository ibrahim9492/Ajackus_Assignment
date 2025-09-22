# User Management Web Application  
# Deployed Link :- https://ajackus-assignment-dashboard.vercel.app/

## 📌 Objective  
A simple web application where users can **view, add, edit, and delete user details** from a mock backend API. The project demonstrates CRUD operations, pagination, filtering, search, sorting, and responsive UI design.  

---

## 🚀 Features  
- **View Users**: Fetch and display all users from the `/users` endpoint.  
- **Add User**: Add a new user using a form (POST request).  
- **Edit User**: Update an existing user's details (PUT request).  
- **Delete User**: Remove a user (DELETE request).  
- **Pagination**: Supports page size options `10, 25, 50, 100`. (Infinite scrolling optional).  
- **Search**: Search users by name, email, or department.  
- **Sorting**: Sort users by ID, name, or department.  
- **Filter Popup**: Filter users by **First Name, Last Name, Email, Department**.  
- **Responsive UI**: Works across desktop, tablet, and mobile devices.  

---

## 🛠️ Tech Stack  
- **Frontend**: React.js  
- **Styling**: CSS / TailwindCSS 
- **HTTP Requests**: Axios 
- **Backend API**: [JSONPlaceholder](https://jsonplaceholder.typicode.com/users)  

---

## ⚙️ Functionality  
1. **View** → GET `/users`  
2. **Add** → POST `/users`  
3. **Edit** → PUT `/users/:id`  
4. **Delete** → DELETE `/users/:id`
5. **Toggle Theme** → Switch between light/dark mode using a button or icon in the navbar

⚠️ Note: JSONPlaceholder is a mock API, so data changes are not persisted.  

---

## 🧾 Validations & Error Handling  
- Client-side validation for forms (required fields, email format, etc.).  
- API failure handling with user-friendly error messages.  

---

## 📸 Screenshots  
(Add your app screenshots here if available.)  

---

## ▶️ Getting Started  

### Clone the repository  
```bash
git clone https://github.com/ibrahim9492/Ajackus_Assignment
cd Ajackus_Assignment
```  

### Install dependencies  
```bash
npm install
```  

### Run the project  
```bash
npm run dev
```  

---

## 📌 Assumptions  
- JSONPlaceholder is used as a mock backend.  
- Data persistence is not possible since the API is fake.  
- Pagination, search, and filtering are handled on the frontend.  

---

## 📄 License  
This project is open-source and free to use.  
