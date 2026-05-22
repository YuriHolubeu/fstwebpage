# Чеклист проверки форм → Supabase

Проект: [xlgiwuqgjcefpamjulsp](https://supabase.com/dashboard/project/xlgiwuqgjcefpamjulsp/editor)

Перед тестом:

```bash
cd /path/to/fstwebpage
npm run dev
```

Откройте сайт (обычно http://localhost:9000). После каждой отправки: **Table Editor → нужная таблица → Refresh**.

Используйте **уникальный email** на каждый тест (меняйте `001`, `002`…), иначе получите дубликат (409) — это нормально.

---

## 1. Join waitlist (кнопка на главной)

**Кнопка:** `Join waitlist`

| Поле | Пример |
|------|--------|
| Your name | `Test Waitlist 001` |
| Email | `fst.waitlist.001@example.com` |
| Message (optional) | `Проверка hero waitlist — кнопка Join waitlist` |

**Ожидание:** зелёное «You are on the waitlist. Thank you!»

**Таблица:** `waiters` — одна строка с этим email и `source_path` (например `/`).

---

## 2. VIP or invest — блок VIP

**Кнопка:** `VIP or invest` → форма **VIP**

| Поле | Пример |
|------|--------|
| Name | `Test VIP 001` |
| Email | `fst.vip.002@example.com` *(новый email; 001 уже мог быть в базе)* |
| Message (optional) | `Проверка VIP — хочу ранний доступ` |

**Ожидание:** «VIP request received. Thank you!» (или info, если email уже есть)

**Таблица:** `vips`

---

## 3. VIP or invest — блок Invest

**Кнопка:** `VIP or invest` → форма **Invest**

| Поле | Пример |
|------|--------|
| Name | `Test Investor 001` |
| Email | `fst.invest.001@example.com` |
| Message (optional) | `Проверка Invest — интерес к проекту` |

**Ожидание:** «Investment interest received. Thank you!»

**Таблица:** `pot-investors`

---

## 4. Contact us — только сообщение

**Кнопка:** FAB справа внизу `Contact us`

| Поле | Пример |
|------|--------|
| Name | `Test Contact 001` |
| Email | `fst.contact.001@example.com` |
| Message | `Проверка Contact us — только contact_messages, без галочек` |
| Галочки | **ни одной** |

**Ожидание:** успешная отправка, диалог закрылся.

**Таблица:** только `contact_messages` (остальные subscription-таблицы **не** меняются).

---

## 5. Contact us — Waitlist + Newsletter

**Кнопка:** `Contact us`

| Поле | Пример |
|------|--------|
| Name | `Test Contact 002` |
| Email | `fst.contact.002@example.com` |
| Message | `Проверка галочек Waitlist + Newsletter` |
| Галочки | **Join the app waitlist**, **Subscribe to the newsletter** |

**Таблицы:**

- `contact_messages` — всегда (есть текст сообщения)
- `waitlist_subscriptions`
- `newsletter_subscriptions`

---

## 6. Contact us — все галочки

| Поле | Пример |
|------|--------|
| Name | `Test Contact 003` |
| Email | `fst.contact.003@example.com` |
| Message | `Проверка всех интересов: waitlist, VIP, newsletter, sponsor` |
| Галочки | **все четыре** |

**Таблицы:**

- `contact_messages`
- `waitlist_subscriptions`
- `vip_subscription_requests`
- `newsletter_subscriptions`
- `sponsor_inquiries`

---

## 7. Contact us — только Sponsor

| Поле | Пример |
|------|--------|
| Name | `Test Sponsor 001` |
| Email | `fst.sponsor.001@example.com` |
| Message | `Проверка только Sponsor project` |
| Галочки | только **Sponsor project** |

**Таблицы:** `contact_messages`, `sponsor_inquiries`

---

## Быстрая сводка

| # | Кнопка | Таблица(и) |
|---|--------|------------|
| 1 | Join waitlist | `waiters` |
| 2 | VIP or invest → VIP | `vips` |
| 3 | VIP or invest → Invest | `pot-investors` |
| 4 | Contact us (без галочек) | `contact_messages` |
| 5 | Contact + 2 галочки | `contact_messages` + 2 subscription |
| 6 | Contact + 4 галочки | `contact_messages` + 4 subscription |
| 7 | Contact + Sponsor | `contact_messages` + `sponsor_inquiries` |

---

## Если что-то не так

| Симптом | Что проверить |
|---------|----------------|
| «Supabase is not configured yet» | `.env.local`, перезапуск `npm run dev` |
| Ошибка сохранения | F12 → Console; RLS в Supabase |
| Email уже есть | Новый email (`002`, `003`…) или удалить тестовую строку в Table Editor |
| Локально ок, на сайте нет | `npm run build` + push `docs/` |

---

## SQL: посмотреть последние заявки

```sql
select 'waiters' as t, email, name, created_at from public.waiters
union all select 'vips', email, name, created_at from public.vips
union all select 'pot-investors', email, name, created_at from public."pot-investors"
union all select 'contact_messages', email, name, created_at from public.contact_messages
order by created_at desc
limit 20;
```
