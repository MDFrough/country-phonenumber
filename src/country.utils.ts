import { countryDataList } from "./country.data";
import { CountryData } from "./country.model";
import { FlagImageFormat, FlagSize, FlagSizeJpg } from "./flag.enum";

export class CountryUtils {
    private static countries: CountryData[] = countryDataList;

    constructor() {
    }

    static getAll(): CountryData[] {
        return this.countries;
    }

    static getCountryCodes(): string[] {
        return this.countries.map(c => c.code);
    }

    static getCountryFlags(shortCode: string, format: FlagImageFormat, size?: FlagSize): string {
        const code = shortCode.toLowerCase();
        return format === 'svg'
            ? `https://flagcdn.com/${code}.svg`
            : `https://flagcdn.com/${size?.toLowerCase()}/${code}.${format.toLowerCase()}`;
    }

    static getCountryFlagSVG(shortCode: string): string {
        return `https://flagcdn.com/${shortCode.toLowerCase()}.svg`;
    }

    static getCountryFlagPNG(shortCode: string, flagSize: FlagSize): string {
        return `https://flagcdn.com/${flagSize.toLowerCase()}/${shortCode.toLowerCase()}.png`;
    }

    static getCountryFlagJPG(shortCode: string, flagSize: FlagSizeJpg): string {
        return `https://flagcdn.com/${flagSize.toLowerCase()}/${shortCode.toLowerCase()}.jpg`;
    }

    static getCountryFlagWEBP(shortCode: string, flagSize: FlagSize): string {
        return `https://flagcdn.com/${flagSize.toLowerCase()}/${shortCode.toLowerCase()}.webp`;
    }


    static getCountryByCode(code: string): CountryData | undefined {
        return this.countries.find(c => c.code === code);
    }

    static getCountryByShortCode(shortCode: string): CountryData | undefined {
        return this.countries.find(c => c.short_code.toLowerCase() === shortCode.toLowerCase());
    }

    static getCountryByName(name: string): CountryData | undefined {
        return this.countries.find(c => c.name.toLowerCase() === name.toLowerCase());
    }

    static getCountryByNameOrCode(nameOrCode: string): CountryData | undefined {
        return this.countries.find(c =>
            c.name.toLowerCase() === nameOrCode.toLowerCase() ||
            c.code.toLowerCase() === nameOrCode.toLowerCase()
        );
    }

    static getCountryByShortCodeOrName(shortCodeOrName: string): CountryData | undefined {
        return this.countries.find(c =>
            c.short_code.toLowerCase() === shortCodeOrName.toLowerCase() ||
            c.name.toLowerCase() === shortCodeOrName.toLowerCase()
        );
    }

    static getCountriesByName(name: string): CountryData[] {
        return this.countries.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
    }

    static getCountriesByCode(code: string): CountryData[] {
        return this.countries.filter(c => c.code.toLowerCase().includes(code.toLowerCase()));
    }

    static getCountriesByShortCode(shortCode: string): CountryData[] {
        return this.countries.filter(c => c.short_code.toLowerCase().includes(shortCode.toLowerCase()));
    }

    static getCountriesByNameOrCode(nameOrCode: string): CountryData[] {
        return this.countries.filter(c =>
            c.name.toLowerCase().includes(nameOrCode.toLowerCase()) ||
            c.code.toLowerCase().includes(nameOrCode.toLowerCase())
        );
    }

    static getCountriesByShortCodeOrName(shortCodeOrName: string): CountryData[] {
        return this.countries.filter(c =>
            c.short_code.toLowerCase().includes(shortCodeOrName.toLowerCase()) ||
            c.name.toLowerCase().includes(shortCodeOrName.toLowerCase())
        );
    }

    static getCountriesByMinLength(minLength: number): CountryData[] {
        return this.countries.filter(c => c.min_length >= minLength);
    }

    static getCountriesByMaxLength(maxLength: number): CountryData[] {
        return this.countries.filter(c => c.max_length <= maxLength);
    }

    static getCountriesByLength(minLength: number, maxLength: number): CountryData[] {
        return this.countries.filter(c => c.min_length >= minLength && c.max_length <= maxLength);
    }

    static getCountriesByShortCodeAndName(shortCode: string, name: string): CountryData[] {
        return this.countries.filter(c =>
            c.short_code.toLowerCase() === shortCode.toLowerCase() &&
            c.name.toLowerCase() === name.toLowerCase()
        );
    }

    static getCountriesByCodeAndName(code: string, name: string): CountryData[] {
        return this.countries.filter(c =>
            c.code.toLowerCase() === code.toLowerCase() &&
            c.name.toLowerCase() === name.toLowerCase()
        );
    }

    static getCountriesByShortCodeAndCode(shortCode: string, code: string): CountryData[] {
        return this.countries.filter(c =>
            c.short_code.toLowerCase() === shortCode.toLowerCase() &&
            c.code.toLowerCase() === code.toLowerCase()
        );
    }

    static getCountriesByNameAndCode(name: string, code: string): CountryData[] {
        return this.countries.filter(c =>
            c.name.toLowerCase() === name.toLowerCase() &&
            c.code.toLowerCase() === code.toLowerCase()
        );
    }

    static getCountriesByNameAndShortCode(name: string, shortCode: string): CountryData[] {
        return this.countries.filter(c =>
            c.name.toLowerCase() === name.toLowerCase() &&
            c.short_code.toLowerCase() === shortCode.toLowerCase()
        );
    }

    static getCountriesByShortCodeAndNameOrCode(shortCode: string, nameOrCode: string): CountryData[] {
        return this.countries.filter(c =>
            c.short_code.toLowerCase() === shortCode.toLowerCase() &&
            (c.name.toLowerCase().includes(nameOrCode.toLowerCase()) || c.code.toLowerCase().includes(nameOrCode.toLowerCase()))
        );
    }

    static getCountriesByCodeAndNameOrShortCode(code: string, nameOrShortCode: string): CountryData[] {
        return this.countries.filter(c =>
            c.code.toLowerCase() === code.toLowerCase() &&
            (c.name.toLowerCase().includes(nameOrShortCode.toLowerCase()) || c.short_code.toLowerCase().includes(nameOrShortCode.toLowerCase()))
        );
    }

    static getCountriesByShortCodeAndNameOrShortCode(shortCode: string, nameOrShortCode: string): CountryData[] {
        return this.countries.filter(c =>
            c.short_code.toLowerCase() === shortCode.toLowerCase() &&
            (c.name.toLowerCase().includes(nameOrShortCode.toLowerCase()) || c.short_code.toLowerCase().includes(nameOrShortCode.toLowerCase()))
        );
    }

    static isNumberValidLength(number: string, minLength: number, maxLength: number): boolean {
        const length = number.replace(/\D/g, '').length; // Remove non-digit characters and get length
        return length >= minLength && length <= maxLength;
    }
}
