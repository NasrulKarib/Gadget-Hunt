# GadgetHunt
**GadgetHunt** is an online marketplace for smart gadgets, offering the latest and hottest devices, including smartphones, tablets, TWS earbuds, neckbands etc.

## Key Features

- **Product Discovery**: Browse, search, filter, and sort gadgets based on preferences.
- **Customer Reviews**: Leave ratings and reviews for purchased products.
- **Seamless Shopping**: Add products to the cart, choose between **Cash on Delivery (COD)** or online payments (**Bkash, Nagad**), and confirm orders.
- **Order Tracking**: Track orders after confirmation.
- **Admin Dashboard**:
  - Manage products (add, update, delete).
  - Apply coupons and special offers.
  - Update order statuses.
  - Communicate with customers regarding issues.

GadgetHunt ensures a smooth and efficient shopping experience for tech enthusiasts while providing sellers with powerful tools to manage their inventory.

**Live Demo**: will be available soon..

## Technologies Used

| Component      | Technology | Description |
|--------------|------------|-------------|
| **Frontend**  | React      | A JavaScript library for building interactive user interfaces. |
| **Backend**   | Django     | A high-level Python web framework for rapid and secure development. |
| **Database**  | PostgreSQL | A powerful, open-source relational database system. |
| **Version Control** | GitHub | A platform for managing and collaborating on code using Git. |

## ER Diagram
![ER Diagram](GadgetHunt.png)
### Database Schema

#### 1. Users
- **Description**: Stores user information, including customers and admins, with role-based access.
- **Columns**: `id (PK)`, `email`, `password`, `name`, `address`, `phone`, `role`, `created_at`.

#### 2. Categories
- **Description**: Manages product categories (e.g., smartphones, laptops).
- **Columns**: `id (PK)`, `name`, `description`.

#### 3. Products
- **Description**: Holds details of smart gadgets available for sale.
- **Columns**: `id (PK)`, `name`, `description`, `price`, `stock_quantity`, `category_id (FK)`, `brand`, `image_url`, `created_at`, `updated_at`.

#### 4. Orders
- **Description**: Tracks customer orders, including payment and coupon details.
- **Columns**: `id (PK)`, `user_id (FK)`, `total_price`, `discount_applied`, `final_price`, `status`, `payment_method`, `payment_status`, `coupon_id (FK)`, `created_at`, `updated_at`, `tracking_number`.

#### 5. Order Items
- **Description**: Contains individual products within an order.
- **Columns**: `id (PK)`, `order_id (FK)`, `product_id (FK)`, `quantity`, `unit_price`, `subtotal`.

#### 6. Shopping Cart
- **Description**: Stores items added to a user’s shopping cart.
- **Columns**: `id (PK)`, `user_id (FK)`, `product_id (FK)`, `quantity`.

#### 7. Reviews
- **Description**: Captures customer reviews and ratings for products.
- **Columns**: `id (PK)`, `user_id (FK)`, `product_id (FK)`, `rating`, `review_text`, `created_at`, `is_reported`.

#### 8. Coupons
- **Description**: Manages discount codes for promotions.
- **Columns**: `id (PK)`, `code`, `discount_value`, `discount_type`, `valid_from`, `valid_until`, `is_active`.

#### 9. Payments
- **Description**: Records payment transactions for orders.
- **Columns**: `id (PK)`, `order_id (FK)`, `amount`, `payment_method`, `transaction_id`, `status`, `created_at`.

#### 10. Browsing History
- **Description**: Tracks products viewed by users for recommendations.
- **Columns**: `id (PK)`, `user_id (FK)`, `product_id (FK)`, `viewed_at`.

#### 11. Messages
- **Description**: Facilitates live chat between customers and admins.
- **Columns**: `id (PK)`, `sender_id (FK)`, `receiver_id (FK)`, `message_text`, `sent_at`, `is_read`.

## Docker Setup and Usage

### Prerequisites
- **Docker**: Ensure Docker and Docker Compose are installed on your system or VM. Install via:
  - Linux: `sudo apt update && sudo apt install docker.io docker-compose`
  - Windows/Mac: Download Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop/).
- **Git**: Clone the repository: `git clone https://github.com/NasrulKarib/Gadget-Hunt`.

### Docker Files
- **`Dockerfile.backend`**: Defines the backend (Django) image based on `python:3.11-slim`, installing dependencies from `backend/requirements.txt` and exposing port `8000`.
- **`Dockerfile.frontend`**: Defines the frontend (React/Vite) image based on `node:alpine`, installing dependencies with npm and exposing port `5173`.

### Configuration
- **Environment Variables**:
  - Create `backend/.env` with NeonDB credentials (e.g., `DB_HOST`, `DB_USER`, `DB_PASSWORD`).
  - Create a root `.env` file with Firebase config (e.g., `VITE_FIREBASE_API_KEY`) for the frontend.
- **.dockerignore**: Prevents copying sensitive files (e.g., `.env`, `node_modules`).

### Running the Application
- **Clone the Repository**:
  ```bash
  git clone https://github.com/NasrulKarib/Gadget-Hunt
  cd GadgetHunt
  ```

- **Build and Start Containers**:
  ```bash
  docker-compose up --build
  ```
  - Backend runs on `http://localhost:8000`
  - Frontend runs on `http://localhost:5173`.

- **Apply Database Migrations**:
  ```bash
  docker-compose exec backend python manage.py migrate
  ```
- Stopping the Application
  ```bash
  docker-compose down
  ```

- Troubleshooting
  ```bash
  docker-compose logs backend
  docker-compose logs frontend
  ```

## Features

### Homepage
The homepage provides an overview of the platform, showcasing latest offers, devices, brands etc.

![alt text](./frontend/src/assets/readme/Home/1.png)
![alt text](./frontend/src/assets/readme/Home/2.png)
![alt text](./frontend/src/assets/readme/Home/3.png)
![alt text](./frontend/src/assets/readme/Home/4.png)
![alt text](./frontend/src/assets/readme/Home/5.png)

### Profile
Profile contains user info, address and user can update their profile

![alt text](./frontend/src/assets/readme/Profile/profile1.png)
![alt text](./frontend/src/assets/readme/Profile/profile2.png)
![alt text](./frontend/src/assets/readme/Profile/profile3.png)
![alt text](./frontend/src/assets/readme/Profile/profile4.png)

