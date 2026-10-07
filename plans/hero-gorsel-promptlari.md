# Hero gorselleri

## Seviye ve cekirdek guncellemesi

Built-in image_gen ile yeni varliklar uretildi. Sitede WebP surumleri kullaniliyor.

- `public/images/empty-coffee-cup-clean.png`: ayni bardagin bos ve temiz alfa kesiti.
- `public/images/coffee-bean.png`: tek kavrulmus kahve cekirdegi.

Bos bardak duzenleme promptu: "Use case: precise-object-edit. Edit this exact glass cup photograph. Change ONLY the contents: remove all coffee and crema so the exact same glass cup is completely empty and clean. Keep exact same cup size, contour, handle on right, position, saucer, perspective, lighting, transparency, image dimensions and framing pixel-aligned to the original. Physically realistic optical glass and clear empty inside. No steam. Preserve original genuine transparent alpha background. Do not zoom, recompose, redesign glass or move anything."

Son alfa temizleme promptu: "Precise background-extraction edit. Keep this EXACT empty glass cup and ivory saucer, their lighting, scale, pixel alignment, dimensions, framing and contours unchanged. Remove ALL residual background, white or gray rectangular canvas pixels, checkerboard patterns and mottled patches outside the cup and saucer. Output genuine transparent alpha outside the cutout, perfectly clean transparent edges. Glass optical translucency should remain realistic. Do not generate a checkerboard as image content. No other changes."

Cekirdek promptu: "Use case: product-mockup. One single photorealistic roasted coffee bean isolated on a genuinely transparent alpha background, medium espresso brown caramel highlights, visible curved central cleft and natural wrinkled texture, top/front slightly three-quarter view, oblong bean standing diagonally, full uncropped bean centered fills canvas with small transparent margins. Soft studio light from upper left matches premium coffee product photography. No cup, no pouch, no text, no beans other than this ONE bean, no tabletop, no floor shadow. Not vector or cartoon."

Built-in image_gen kullanildi. Iki varlik gercek alfa seffafligi ile uretildi.

## public/images/cawa-package.png

Use case: product-mockup. Asset type: transparent product photography cutout for animated website hero. Primary request: One highly photorealistic premium coffee bag, dark espresso brown matte flexible foil pouch, warm cream rectangular label with clearly readable exact lowercase brand text "cawa" in beautiful large serif lettering. Tiny secondary text "COFFEE" only. Three-quarter front view with right side just visible, upright, entire pouch uncropped, camera slightly above center. Bag mouth at top right corner visibly open a little, natural packaging crinkles, heat seal seams, real subtle texture and studio reflections. Tall stand-up coffee pouch proportions about 170 wide by 250 high. Warm soft commercial studio light from upper left; espresso #3D2A24, caramel #AD7045, cream #F7F0E5. Composition: single centered bag fills canvas with small even transparent margins; no cup, no beans, no tabletop, no background, no cast floor shadow, no hands, no other text. Genuine alpha transparent background. Not illustration, not vector, not cartoon; luxury real product photography.

## public/images/hot-coffee-cup.png

Use case: product-mockup. Asset type: transparent product photography cutout for animated coffee website hero. Primary request: One highly photorealistic clear heat-resistant glass coffee cup with a transparent rounded handle on the RIGHT, filled about two-thirds with dark hot coffee, a thin caramel crema on surface. Resting on a minimalist ivory ceramic saucer. Eye-level view slightly from above showing elliptical coffee surface, glass sides and saucer with same warm soft commercial studio light from upper left. Entire cup handle and saucer uncropped. Real optical refraction, transparent glass edge highlights, coffee rich espresso brown #3D2A24 with caramel #AD7045 crema, ivory saucer #F7F0E5. Single centered object fills canvas with small even transparent margins. No visible steam baked into image (we animate it separately), no beans, no bag, no background, no tabletop, no text, no hands. Genuine alpha transparent background and natural very subtle contact shadow only under saucer. Not illustration, not cartoon; luxury actual product photography.
