# Admin System

## Routes
- `/admin/login`: Public admin authentication portal (Email + Password)
- `/admin/unauthorized`: Access restricted state for non-admin authenticated users
- `/admin/dashboard`: Management dashboard foundation (protected by `requireAdmin()`)
- `/admin/gemstones`: Catalogue inventory management (Phase 11)
- `/admin/gemstones/new`: Specimen creation workflow (Phase 11)
- `/admin/gemstones/[id]/edit`: Specimen editor workflow (Phase 11)
- `/admin/settings`: Site configuration & contacts (Phase 11)

## Architecture & Security Reference
The complete authentication and authorization architecture specification is documented in:
- [authentication.md](file:///d:/web/saif-trading-co/docs/authentication.md)
- [admin-dashboard.md](file:///d:/web/saif-trading-co/docs/admin-dashboard.md)
