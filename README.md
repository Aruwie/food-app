# Food App - CRUD Assignment

## Periode Pembelajaran
- Introduction to Next.js and Basic Routing
- Next JS Data Fetching and CRUD Operations

## Objectives
- Mampu mengimplementasikan Routing pada Website menggunakan Next.js
- Mampu melakukan CRUD dari website yang sudah dibuat
- Mampu menggunakan API yang sudah disediakan/dibuat

## Deskripsi Assignment
Buatlah table 'Food' pada Supabase dengan menggunakan Prisma dengan field:
- `name`: string
- `ingredients`: string
- `description`: text
- `type`: enum (upf, fresh)
- `createdAt`
- `updatedAt`

## Detail Assignment Implementation

### 1. Halaman Login ✅
- Rute: `/login`
- Form berupa email, password, dan submit button

### 2. List Makanan ✅
- Membuat tampilan daftar makanan
- Melakukan GET request ke API `/api/foods`
- Menampilkan judul dan deskripsi makanan dalam list
- Klik pada makanan akan redirect ke halaman Detail Makanan

### 3. Detail Makanan ✅
- Halaman detail makanan yang dinamis
- Melakukan GET request ke API `/api/foods/[id]`
- Menampilkan form dengan input nama, deskripsi, tipe, bahan-bahan, submit button
- Setelah submit, lakukan PUT request ke API `/api/update-food/[id]`
- Reload halaman setelah update berhasil
- Tombol delete melakukan DELETE request ke API `/api/delete-food/[id]` dan redirect ke List Makanan

### 4. Buat Makanan ✅
- Menyediakan navbar dengan logo dan tombol buat makanan
- Tombol redirect ke halaman Membuat Makanan
- Form dengan input nama, deskripsi, bahan-bahan, tipe, submit button
- Submit form melakukan POST request ke API `/api/create-food`
- Redirect ke List Makanan setelah berhasil membuat makanan

### 5. Bonus - Styling ✅
- Menambahkan styling pada halaman untuk meningkatkan tampilan
- Responsive design dengan Tailwind CSS

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Setup database:
   ```bash
   npx prisma db push
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to start!

## Database Schema

```prisma
enum FoodType {
  upf
  fresh
}

model Food {
  id          Int       @id @default(autoincrement())
  name        String
  ingredients String
  description String
  type        FoodType
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/foods` | Get all foods |
| GET | `/api/foods/[id]` | Get single food |
| POST | `/api/create-food` | Create new food |
| PUT | `/api/update-food/[id]` | Update food |
| DELETE | `/api/delete-food/[id]` | Delete food |

## Project Routes

| Route | Description |
|-------|-------------|
| `/` | Redirects to login or foods based on auth |
| `/login` | Login page |
| `/foods` | Food list page |
| `/foods/[id]` | Food detail & edit page |
| `/foods/create` | Create new food page |

## Built With
- Next.js 16
- Prisma ORM
- PostgreSQL (Supabase)
- Tailwind CSS
- React 19
