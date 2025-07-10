import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CountryData } from './country-model';
import { FlagImageFormat, FlagSize, FlagSizeJpg } from './flag.enum';

vi.mock('./country.data', () => {
    const mockedCountriesData: CountryData[] = [
        { "code": "+1", "short_code": "US", "name": "United States", "min_length": 10, "max_length": 11 },
        { "code": "+1", "short_code": "CA", "name": "Canada", "min_length": 10, "max_length": 11 },
        { "code": "+44", "short_code": "GB", "name": "United Kingdom", "min_length": 11, "max_length": 12 },
    ];

    return {
        countryData: mockedCountriesData,
    };
});

import { CountryUtils } from './index';
import { countryData as mockedCountryDataForTests } from './country.data';


describe('CountryUtils Tests', () => {
    let utils: InstanceType<typeof CountryUtils>;

    beforeEach(() => {
        utils = new CountryUtils();
    });

    it('getAll returns all countries', () => {
        expect(utils.getAll()).toEqual(mockedCountryDataForTests);
    });

    it('getCountryCodes returns all codes', () => {
        expect(utils.getCountryCodes()).toEqual(['+1', '+1', '+44']);
    });

    it('getCountryFlags returns SVG url', () => {
        expect(utils.getCountryFlags('US', FlagImageFormat.SVG)).toBe('https://flagcdn.com/us.svg');
    });

    it('getCountryFlags returns PNG url with size', () => {
        expect(utils.getCountryFlags('CA', FlagImageFormat.PNG, FlagSize.Size_64x48)).toBe('https://flagcdn.com/64x48/ca.png');
    });

    it('getCountryFlagSVG returns SVG url', () => {
        expect(utils.getCountryFlagSVG('GB')).toBe('https://flagcdn.com/gb.svg');
    });

    it('getCountryFlagPNG returns PNG url', () => {
        expect(utils.getCountryFlagPNG('US', FlagSize.Size_32x24)).toBe('https://flagcdn.com/32x24/us.png');
    });

    it('getCountryFlagJPG returns JPG url', () => {
        expect(utils.getCountryFlagJPG('CA', FlagSizeJpg.Size_1280)).toBe('https://flagcdn.com/w1280/ca.jpg');
    });

    it('getCountryFlagWEBP returns WEBP url', () => {
        expect(utils.getCountryFlagWEBP('GB', FlagSize.Size_64x48)).toBe('https://flagcdn.com/64x48/gb.webp');
    });

    it('getCountryByCode finds by code', () => {
        expect(utils.getCountryByCode('+1')).toEqual(mockedCountryDataForTests[0]);
        expect(utils.getCountryByCode('+0000000')).toBeUndefined();
    });

    it('getCountryByShortCode finds by short_code', () => {
        expect(utils.getCountryByShortCode('ca')).toEqual(mockedCountryDataForTests[1]);
        expect(utils.getCountryByShortCode('xx')).toBeUndefined();
    });

    it('getCountryByName finds by name (case-insensitive)', () => {
        expect(utils.getCountryByName('united kingdom')).toEqual(mockedCountryDataForTests[2]);
        expect(utils.getCountryByName('unknown')).toBeUndefined();
    });

    it('getCountryByNameOrCode finds by name or code', () => {
        expect(utils.getCountryByNameOrCode('Canada')).toEqual(mockedCountryDataForTests[1]);
        expect(utils.getCountryByNameOrCode('+44')).toEqual(mockedCountryDataForTests[2]);
        expect(utils.getCountryByNameOrCode('none')).toBeUndefined();
    });

    it('getCountryByShortCodeOrName finds by short_code or name', () => {
        expect(utils.getCountryByShortCodeOrName('us')).toEqual(mockedCountryDataForTests[0]);
        expect(utils.getCountryByShortCodeOrName('Canada')).toEqual(mockedCountryDataForTests[1]);
        expect(utils.getCountryByShortCodeOrName('none')).toBeUndefined();
    });

    it('getCountriesByName returns partial matches', () => {
        expect(utils.getCountriesByName('United')).toEqual([mockedCountryDataForTests[0], mockedCountryDataForTests[2]]);
    });

    it('getCountriesByCode returns partial matches', () => {
        expect(utils.getCountriesByCode('+1')).toEqual([mockedCountryDataForTests[0], mockedCountryDataForTests[1]]);
    });

    it('getCountriesByShortCode returns partial matches', () => {
        expect(utils.getCountriesByShortCode('g')).toEqual([mockedCountryDataForTests[2]]);
    });

    it('getCountriesByNameOrCode returns partial matches', () => {
        expect(utils.getCountriesByNameOrCode('United Kingdom')).toEqual([mockedCountryDataForTests[2]]);
        expect(utils.getCountriesByNameOrCode('+1')).toEqual([mockedCountryDataForTests[0], mockedCountryDataForTests[1]]);
    });

    it('getCountriesByShortCodeOrName returns partial matches', () => {
        expect(utils.getCountriesByShortCodeOrName('ca')).toEqual([mockedCountryDataForTests[1]]);
        expect(utils.getCountriesByShortCodeOrName('United')).toEqual([mockedCountryDataForTests[0], mockedCountryDataForTests[2]]);
    });

    it('getCountriesByShortCodeAndName returns exact match', () => {
        expect(utils.getCountriesByShortCodeAndName('US', 'United States')).toEqual([mockedCountryDataForTests[0]]);
    });

    it('getCountriesByCodeAndName returns exact match', () => {
        expect(utils.getCountriesByCodeAndName('+1', 'Canada')).toEqual([mockedCountryDataForTests[1]]);
    });

    it('getCountriesByShortCodeAndCode returns exact match', () => {
        expect(utils.getCountriesByShortCodeAndCode('GB', '+44')).toEqual([mockedCountryDataForTests[2]]);
    });

    it('getCountriesByNameAndCode returns exact match', () => {
        expect(utils.getCountriesByNameAndCode('Canada', '+1')).toEqual([mockedCountryDataForTests[1]]);
    });

    it('getCountriesByNameAndShortCode returns exact match', () => {
        expect(utils.getCountriesByNameAndShortCode('United States', 'US')).toEqual([mockedCountryDataForTests[0]]);
    });

    it('getCountriesByShortCodeAndNameOrCode returns matches', () => {
        expect(utils.getCountriesByShortCodeAndNameOrCode('US', 'United States')).toEqual([mockedCountryDataForTests[0]]);
        expect(utils.getCountriesByShortCodeAndNameOrCode('CA', '+1')).toEqual([mockedCountryDataForTests[1]]);
    });

    it('getCountriesByCodeAndNameOrShortCode returns matches', () => {
        expect(utils.getCountriesByCodeAndNameOrShortCode('+44', 'United Kingdom')).toEqual([mockedCountryDataForTests[2]]);
        expect(utils.getCountriesByCodeAndNameOrShortCode('+1', 'CA')).toEqual([mockedCountryDataForTests[1]]);
    });


    it('isNumberValidLength validates number length', () => {
        expect(utils.isNumberValidLength('123-456-7890', 10, 10)).toBe(true);
        expect(utils.isNumberValidLength('123456789', 10, 12)).toBe(false);
        expect(utils.isNumberValidLength('123456789012', 10, 12)).toBe(true);
        expect(utils.isNumberValidLength('1234567890123', 10, 12)).toBe(false);
    });
});