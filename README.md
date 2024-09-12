**Expense Tracker App**

**Description**

The Expense Tracker is a web application designed to help users manage their personal finances. It allows users to track their income and expenses, providing a clear view of their financial situation. Users can sign up, log in, and start managing their expenses by adding transactions, categorizing them, and viewing summaries.

**Features**

- User authentication (Signup/Signin with JWT authentication)
- Add, view, and delete income/expense transactions
- Categorize transactions 
- View transaction history
- Dashboard summary of total income, total expenses, and balance

**Tech Stack**

- Frontend: React.js, Styled-components
- Backend: Express.js, Node.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- HTTP Requests: Axios

**API Endpoints**

**User Authentication** 

- POST /api/users/signup - Register a new user
- POST /api/users/login - User login
  
**Transactions**

- POST /api/transactions - Add a new transaction
- GET /api/transactions - Get all transactions for the logged-in user
- DELETE /api/transactions/:id - Delete a transaction

**Contributing**

- Feel free to fork this repository and submit pull requests. Contributions are welcome! 🤹‍♂️


