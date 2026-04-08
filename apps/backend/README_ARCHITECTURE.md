# Backend Architecture (MVC + Service + Repository)

## 1) Muc tieu

Tach ro tung lop de de test, review va mo rong:

- routes: dinh nghia endpoint + middleware
- controllers: nhan request/tra response
- services: business logic
- repositories: truy van Supabase/PostgreSQL
- models: dinh nghia mapping du lieu
- validators: validate payload bang zod

## 2) Cau truc de xuat

```text
src/
  app.js
  index.js
  config/
  routes/
  controllers/
  services/
  repositories/
  models/
  validators/
  middleware/
  utils/
```

## 3) Convention theo module

Moi tinh nang (auth, order, product, chatbot) giu pattern:

- `<module>.routes.js`
- `<module>.controller.js`
- `<module>.service.js`
- `<module>.repository.js` (neu module co truy van DB phuc tap)
- `<module>.validator.js`

## 4) Request flow

`Route -> Auth middleware -> Validator -> Controller -> Service -> Repository -> Supabase`

## 5) Quy uoc coding

- Controller khong viet logic DB.
- Service khong dung `req`/`res`.
- Repository chi chua truy van du lieu.
- Tat ca input mutating API phai validate tai validator.
- Loi duoc throw o service/repository, xu ly tap trung o `error.middleware.js`.
