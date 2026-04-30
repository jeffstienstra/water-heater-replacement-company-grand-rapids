CATALOG IMAGE FOLDER — READ BEFORE ADDING OR REMOVING FILES
=============================================================

Images in this folder are automatically discovered at build time via import.meta.glob
and processed by Astro's image pipeline (resized, converted to WebP, hashed).

EVERY image here is mapped and cross-referenced against the `imagePath` values
in src/data/waterHeaterModels.js:

  - If a model references an image NOT found in this folder → build ERROR (fix: add the image)
  - If an image exists here but no model references it  → build WARNING (safe to remove)

RULES:
  1. Only add images that are actively referenced by a model in waterHeaterModels.js
  2. When adding a new image, also add its imagePath to the corresponding model entry
  3. When removing an image, also remove or update the imagePath in waterHeaterModels.js
  4. Filenames must be unique across all subdirectories

FOLDER STRUCTURE:
  catalog/
  └── rheem/         ← brand-specific subdirectories
      ├── natDraft_tank.webp
      ├── powerVent_tank.webp
      └── ...

Image key format used in waterHeaterModels.js:
  /images/catalog/rheem/natDraft_tank.webp
  (i.e. strip '/src/assets' from the file path)
