#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:3000/api/v1}"
ACCESS_TOKEN="${ACCESS_TOKEN:-}"
FCM_TOKEN="${FCM_TOKEN:-demo-fcm-token}"
ORDER_ID="${ORDER_ID:-}"
NOTIFICATION_ID="${NOTIFICATION_ID:-}"

if [[ -z "$ACCESS_TOKEN" ]]; then
  echo "ERROR: Please set ACCESS_TOKEN before running this script"
  echo "Example: ACCESS_TOKEN=<token> bash apps/backend/scripts/curl-orders-notifications.sh"
  exit 1
fi

echo "== 1) Checkout =="
curl -sS -X POST "$BASE_URL/orders/checkout" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "X-Idempotency-Key: checkout-demo-001" \
  -d '{
    "items": [
      { "productId": "00000000-0000-0000-0000-000000000001", "quantity": 1 }
    ],
    "paymentMethod": "COD",
    "address": "123 Duong ABC, Quan 1, TP HCM"
  }' | jq .

echo
echo "== 2) Orders me =="
curl -sS "$BASE_URL/orders/me" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq .

if [[ -n "$ORDER_ID" ]]; then
  echo
  echo "== 3) Update order status =="
  curl -sS -X PUT "$BASE_URL/orders/$ORDER_ID/status" \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"status":"CONFIRMED"}' | jq .
else
  echo
  echo "Skip update status: set ORDER_ID to test /orders/:id/status"
fi

echo
echo "== 4) Register notification device token =="
curl -sS -X POST "$BASE_URL/notifications/device-token" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"fcmToken\":\"$FCM_TOKEN\",\"deviceType\":\"android\"}" | jq .

echo
echo "== 5) List notifications =="
curl -sS "$BASE_URL/notifications?page=1&limit=20" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq .

if [[ -n "$NOTIFICATION_ID" ]]; then
  echo
  echo "== 6) Mark notification as read =="
  curl -sS -X PUT "$BASE_URL/notifications/$NOTIFICATION_ID/read" \
    -H "Authorization: Bearer $ACCESS_TOKEN" | jq .
else
  echo
  echo "Skip mark-as-read: set NOTIFICATION_ID to test /notifications/:id/read"
fi
