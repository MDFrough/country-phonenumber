# 🌍 CountryUtils
A TypeScript utility library for working with country data, flags, and phone number validations.

---

## 📦 Features

- Get all country data or search by:
  - `name`, `code`, `short_code`
  - partial match or exact match
- Generate flag image URLs (SVG, PNG, JPG, WEBP)
- Validate phone number lengths against country rules

---

## 📥 Installation

```bash
npm i @mdfrough/country-phonenumber
```

---

## 📄 Usage

```ts
import { CountryUtils, FlagImageFormat, FlagSize, FlagSizeJpg} from '@mdfrough/country-phonenumber';

const utils = new CountryUtils();

// Get all countries
const all = utils.getAll();

// Get flag
const svgFlag = utils.getCountryFlagSVG('US');
const pngFlag = utils.getCountryFlagPNG('US', FlagSize.Size_64x48);

// Validate number length
const isValid = utils.isNumberValidLength('+1 234-567-8901', 10, 10);
```

---

## 🧩 API

### 📘 Country Queries

| Method | Description |
|--------|-------------|
| `getAll()` | Returns all country data |
| `getCountryCodes()` | Returns an array of all country codes |
| `getCountryByCode(code)` | Finds a country by ISO code |
| `getCountryByShortCode(short)` | Finds a country by lowercase short code |
| `getCountryByName(name)` | Finds a country by name |
| `getCountryByNameOrCode(value)` | Finds a country by matching name or code |
| `getCountryByShortCodeOrName(value)` | Finds by short code or name |

### 🔍 Partial Match Search

| Method | Description |
|--------|-------------|
| `getCountriesByName(name)` | Partial match by name |
| `getCountriesByCode(code)` | Partial match by ISO code |
| `getCountriesByShortCode(shortCode)` | Partial match by short_code |
| `getCountriesByNameOrCode(value)` | Partial match by name or code |
| `getCountriesByShortCodeOrName(value)` | Partial match by short_code or name |

### 🧮 Length Filtering

| Method | Description |
|--------|-------------|
| `getCountriesByMinLength(min)` | Countries with `min_length >= min` |
| `getCountriesByMaxLength(max)` | Countries with `max_length <= max` |
| `getCountriesByLength(min, max)` | Countries with length between range |

### 🧠 Compound Filters

| Method | Description |
|--------|-------------|
| `getCountriesByShortCodeAndName(short, name)` | Exact match for both |
| `getCountriesByCodeAndName(code, name)` | Exact match for both |
| `getCountriesByShortCodeAndCode(short, code)` | Exact match for both |
| `getCountriesByNameAndCode(name, code)` | Exact match for both |
| `getCountriesByNameAndShortCode(name, short)` | Exact match for both |

| Match Combo | Description |
|-------------|-------------|
| `getCountriesByShortCodeAndNameOrCode(short, nameOrCode)` | Match short_code AND name/code (partial) |
| `getCountriesByCodeAndNameOrShortCode(code, nameOrShort)` | Match code AND name/short_code (partial) |
| `getCountriesByShortCodeAndNameOrShortCode(short, nameOrShort)` | Match short_code AND name/short_code (partial) |

---

## 🏁 Flag URLs

| Method | Description |
|--------|-------------|
| `getCountryFlags(shortCode, format, size?)` | Universal flag generator |
| `getCountryFlagSVG(shortCode)` | Returns `.svg` URL |
| `getCountryFlagPNG(shortCode, size)` | Returns `.png` URL |
| `getCountryFlagJPG(shortCode, size)` | Returns `.jpg` URL |
| `getCountryFlagWEBP(shortCode, size)` | Returns `.webp` URL |

### 🔢 Enums

- `FlagImageFormat`: `svg`, `png`, `webp`, `jpg`
- `FlagSize`: e.g. `Size_32x24`, `Size_64x48`
- `FlagSizeJpg`: e.g. `Size_160`, `Size_320`, ..., `Size_1280`

---

## ✅ Phone Number Validation

```ts
utils.isNumberValidLength('+1 (123) 456-7890', 10, 10); // true
utils.isNumberValidLength('123456789', 10, 12); // false
```

Strips non-digit characters and checks if the cleaned number length is within range.

---

## 🧪 Tests

Run all unit tests using:

```bash
npm test
# or
vitest run
```

---

## 📁 Structure

```
src/
├── country.data.ts       # JSON-like list of countries
├── country.model.ts      # CountryData interface
├── flag.enum.ts          # Flag image enums
└── index.ts              # CountryUtils class
```

---

## 🛠 Author

Made with ❤️ by MDFrough

---


---

## 🌐 Flag Image Source

This package uses country flag images from [FlagCDN](https://flagcdn.com/).


## 📄 License

MIT