import { countryDataList } from "./country.data";
import { CountryData } from "./country.model";
import { FlagImageFormat, FlagSize, FlagSizeJpg } from "./flag.enum";

export class CountryUtils {
    private countries: CountryData[] = countryDataList;

    constructor() {
    }

    getAll(): CountryData[] {
        return this.countries;
    }

    getCountryCodes(): string[] {
        return this.countries.map(c => c.code);
    }

    getCountryFlags(shortCode: string, format: FlagImageFormat, size?: FlagSize): string {
        const code = shortCode.toLowerCase();
        return format === 'svg'
            ? `https://flagcdn.com/${code}.svg`
            : `https://flagcdn.com/${size?.toLowerCase()}/${code}.${format.toLowerCase()}`;
    }

    getCountryFlagSVG(shortCode: string): string {
        return `https://flagcdn.com/${shortCode.toLowerCase()}.svg`;
    }

    getCountryFlagPNG(shortCode: string, flagSize: FlagSize): string {
        return `https://flagcdn.com/${flagSize.toLowerCase()}/${shortCode.toLowerCase()}.png`;
    }

    getCountryFlagJPG(shortCode: string, flagSize: FlagSizeJpg): string {
        return `https://flagcdn.com/${flagSize.toLowerCase()}/${shortCode.toLowerCase()}.jpg`;
    }

    getCountryFlagWEBP(shortCode: string, flagSize: FlagSize): string {
        return `https://flagcdn.com/${flagSize.toLowerCase()}/${shortCode.toLowerCase()}.webp`;
    }


    getCountryByCode(code: string): CountryData | undefined {
        return this.countries.find(c => c.code === code);
    }

    getCountryByShortCode(shortCode: string): CountryData | undefined {
        return this.countries.find(c => c.short_code.toLowerCase() === shortCode.toLowerCase());
    }

    getCountryByName(name: string): CountryData | undefined {
        return this.countries.find(c => c.name.toLowerCase() === name.toLowerCase());
    }

    getCountryByNameOrCode(nameOrCode: string): CountryData | undefined {
        return this.countries.find(c =>
            c.name.toLowerCase() === nameOrCode.toLowerCase() ||
            c.code.toLowerCase() === nameOrCode.toLowerCase()
        );
    }

    getCountryByShortCodeOrName(shortCodeOrName: string): CountryData | undefined {
        return this.countries.find(c =>
            c.short_code.toLowerCase() === shortCodeOrName.toLowerCase() ||
            c.name.toLowerCase() === shortCodeOrName.toLowerCase()
        );
    }

    getCountriesByName(name: string): CountryData[] {
        return this.countries.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
    }

    getCountriesByCode(code: string): CountryData[] {
        return this.countries.filter(c => c.code.toLowerCase().includes(code.toLowerCase()));
    }

    getCountriesByShortCode(shortCode: string): CountryData[] {
        return this.countries.filter(c => c.short_code.toLowerCase().includes(shortCode.toLowerCase()));
    }

    getCountriesByNameOrCode(nameOrCode: string): CountryData[] {
        return this.countries.filter(c =>
            c.name.toLowerCase().includes(nameOrCode.toLowerCase()) ||
            c.code.toLowerCase().includes(nameOrCode.toLowerCase())
        );
    }

    getCountriesByShortCodeOrName(shortCodeOrName: string): CountryData[] {
        return this.countries.filter(c =>
            c.short_code.toLowerCase().includes(shortCodeOrName.toLowerCase()) ||
            c.name.toLowerCase().includes(shortCodeOrName.toLowerCase())
        );
    }

    getCountriesByMinLength(minLength: number): CountryData[] {
        return this.countries.filter(c => c.min_length >= minLength);
    }

    getCountriesByMaxLength(maxLength: number): CountryData[] {
        return this.countries.filter(c => c.max_length <= maxLength);
    }

    getCountriesByLength(minLength: number, maxLength: number): CountryData[] {
        return this.countries.filter(c => c.min_length >= minLength && c.max_length <= maxLength);
    }

    getCountriesByShortCodeAndName(shortCode: string, name: string): CountryData[] {
        return this.countries.filter(c =>
            c.short_code.toLowerCase() === shortCode.toLowerCase() &&
            c.name.toLowerCase() === name.toLowerCase()
        );
    }

    getCountriesByCodeAndName(code: string, name: string): CountryData[] {
        return this.countries.filter(c =>
            c.code.toLowerCase() === code.toLowerCase() &&
            c.name.toLowerCase() === name.toLowerCase()
        );
    }

    getCountriesByShortCodeAndCode(shortCode: string, code: string): CountryData[] {
        return this.countries.filter(c =>
            c.short_code.toLowerCase() === shortCode.toLowerCase() &&
            c.code.toLowerCase() === code.toLowerCase()
        );
    }

    getCountriesByNameAndCode(name: string, code: string): CountryData[] {
        return this.countries.filter(c =>
            c.name.toLowerCase() === name.toLowerCase() &&
            c.code.toLowerCase() === code.toLowerCase()
        );
    }

    getCountriesByNameAndShortCode(name: string, shortCode: string): CountryData[] {
        return this.countries.filter(c =>
            c.name.toLowerCase() === name.toLowerCase() &&
            c.short_code.toLowerCase() === shortCode.toLowerCase()
        );
    }

    getCountriesByShortCodeAndNameOrCode(shortCode: string, nameOrCode: string): CountryData[] {
        return this.countries.filter(c =>
            c.short_code.toLowerCase() === shortCode.toLowerCase() &&
            (c.name.toLowerCase().includes(nameOrCode.toLowerCase()) || c.code.toLowerCase().includes(nameOrCode.toLowerCase()))
        );
    }

    getCountriesByCodeAndNameOrShortCode(code: string, nameOrShortCode: string): CountryData[] {
        return this.countries.filter(c =>
            c.code.toLowerCase() === code.toLowerCase() &&
            (c.name.toLowerCase().includes(nameOrShortCode.toLowerCase()) || c.short_code.toLowerCase().includes(nameOrShortCode.toLowerCase()))
        );
    }

    getCountriesByShortCodeAndNameOrShortCode(shortCode: string, nameOrShortCode: string): CountryData[] {
        return this.countries.filter(c =>
            c.short_code.toLowerCase() === shortCode.toLowerCase() &&
            (c.name.toLowerCase().includes(nameOrShortCode.toLowerCase()) || c.short_code.toLowerCase().includes(nameOrShortCode.toLowerCase()))
        );
    }

    isNumberValidLength(number: string, minLength: number, maxLength: number): boolean {
        const length = number.replace(/\D/g, '').length; // Remove non-digit characters and get length
        return length >= minLength && length <= maxLength;
    }
}
