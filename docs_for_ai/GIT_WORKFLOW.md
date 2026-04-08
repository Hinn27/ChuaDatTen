# Git Workflow cho Team

## Nhanh gon

1. Tao branch tu `develop`.
2. Code va commit theo Conventional Commits.
3. Push branch va tao PR vao `develop`.
4. Bat buoc review >= 1 nguoi.
5. Merge squash/rebase theo quy dinh team.

## Branch strategy

- `main`: production, cam push truc tiep.
- `develop`: integration branch, cam push truc tiep.
- `feat/*`: tinh nang moi.
- `fix/*`: sua loi.
- `refactor/*`: cai to code khong doi behavior.
- `chore/*`: viec phu tro.
- `hotfix/*`: fix gap cho production.

## Quy tac dat ten branch

`<type>/<scope>-<short-task>`

Vi du:

- `feat/backend-supabase-rls`
- `fix/mobile-auth-token`
- `chore/web-update-env`

## Quy tac commit

Format:

`<type>(<scope>): <subject>`

Vi du:

- `feat(backend): add checkout rpc with rls guard`
- `fix(auth): verify supabase access token`

## PR checklist

- Da rebase/pull moi nhat tu `develop`.
- Da test local.
- Co mo ta business impact.
- Co screenshot/video neu thay doi UI.
- Khong de secret trong code.

## Protected branch rules de xuat

- `main`, `develop`: required pull request.
- Required status checks: `lint`, `build`.
- Required approvals: 1-2.
- Block force push.
