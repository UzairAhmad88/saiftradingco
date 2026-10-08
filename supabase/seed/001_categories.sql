-- =====================================================================
-- SAIF TRADING CO — VERIFIED CATEGORY SEED DATA
-- Specialization: Tourmaline, Kunzite, Morganite
-- =====================================================================

insert into public.categories (name, slug, description, sort_order, is_active)
values
  (
    'Tourmaline',
    'tourmaline',
    'Selected natural rough Tourmaline crystals exhibiting vertical prism striations, vivid green hues, and intact pyramid terminations.',
    1,
    true
  ),
  (
    'Kunzite',
    'kunzite',
    'Natural rough Kunzite crystals featuring delicate lilac-pink coloration, strong pleochroic transparency, and natural monoclinic cleavage planes.',
    2,
    true
  ),
  (
    'Morganite',
    'morganite',
    'Hexagonal rough Morganite crystals characterized by delicate peach tones, vitreous luster, and gemmy crystalline clarity.',
    3,
    true
  )
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;
