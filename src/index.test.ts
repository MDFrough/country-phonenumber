import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CountryData } from './country.model';
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
import { countryDataList as mockedCountryDataForTests } from './country.data';


describe('CountryUtils Tests', () => {


    it('getAll returns all countries', () => {
        expect(CountryUtils.getAll()).toEqual(mockedCountryDataForTests);
    });

    it('getCountryCodes returns all codes', () => {
        expect(CountryUtils.getCountryCodes()).toEqual(['+1', '+1', '+44']);
    });

    it('getCountryFlags returns SVG url', () => {
        expect(CountryUtils.getCountryFlags('US', FlagImageFormat.SVG)).toBe('https://flagcdn.com/us.svg');
    });

    it('getCountryFlags returns PNG url with size', () => {
        expect(CountryUtils.getCountryFlags('CA', FlagImageFormat.PNG, FlagSize.Size_64x48)).toBe('https://flagcdn.com/64x48/ca.png');
    });

    it('getCountryFlagSVG returns SVG url', () => {
        expect(CountryUtils.getCountryFlagSVG('GB')).toBe('https://flagcdn.com/gb.svg');
    });

    it('getCountryFlagPNG returns PNG url', () => {
        expect(CountryUtils.getCountryFlagPNG('US', FlagSize.Size_32x24)).toBe('https://flagcdn.com/32x24/us.png');
    });

    it('getCountryFlagJPG returns JPG url', () => {
        expect(CountryUtils.getCountryFlagJPG('CA', FlagSizeJpg.Size_1280)).toBe('https://flagcdn.com/w1280/ca.jpg');
    });

    it('getCountryFlagWEBP returns WEBP url', () => {
        expect(CountryUtils.getCountryFlagWEBP('GB', FlagSize.Size_64x48)).toBe('https://flagcdn.com/64x48/gb.webp');
    });

    it('getCountryByCode finds by code', () => {
        expect(CountryUtils.getCountryByCode('+1')).toEqual(mockedCountryDataForTests[0]);
        expect(CountryUtils.getCountryByCode('+0000000')).toBeUndefined();
    });

    it('getCountryByShortCode finds by short_code', () => {
        expect(CountryUtils.getCountryByShortCode('ca')).toEqual(mockedCountryDataForTests[1]);
        expect(CountryUtils.getCountryByShortCode('xx')).toBeUndefined();
    });

    it('getCountryByName finds by name (case-insensitive)', () => {
        expect(CountryUtils.getCountryByName('united kingdom')).toEqual(mockedCountryDataForTests[2]);
        expect(CountryUtils.getCountryByName('unknown')).toBeUndefined();
    });

    it('getCountryByNameOrCode finds by name or code', () => {
        expect(CountryUtils.getCountryByNameOrCode('Canada')).toEqual(mockedCountryDataForTests[1]);
        expect(CountryUtils.getCountryByNameOrCode('+44')).toEqual(mockedCountryDataForTests[2]);
        expect(CountryUtils.getCountryByNameOrCode('none')).toBeUndefined();
    });

    it('getCountryByShortCodeOrName finds by short_code or name', () => {
        expect(CountryUtils.getCountryByShortCodeOrName('us')).toEqual(mockedCountryDataForTests[0]);
        expect(CountryUtils.getCountryByShortCodeOrName('Canada')).toEqual(mockedCountryDataForTests[1]);
        expect(CountryUtils.getCountryByShortCodeOrName('none')).toBeUndefined();
    });

    it('getCountriesByName returns partial matches', () => {
        expect(CountryUtils.getCountriesByName('United')).toEqual([mockedCountryDataForTests[0], mockedCountryDataForTests[2]]);
    });

    it('getCountriesByCode returns partial matches', () => {
        expect(CountryUtils.getCountriesByCode('+1')).toEqual([mockedCountryDataForTests[0], mockedCountryDataForTests[1]]);
    });

    it('getCountriesByShortCode returns partial matches', () => {
        expect(CountryUtils.getCountriesByShortCode('g')).toEqual([mockedCountryDataForTests[2]]);
    });

    it('getCountriesByNameOrCode returns partial matches', () => {
        expect(CountryUtils.getCountriesByNameOrCode('United Kingdom')).toEqual([mockedCountryDataForTests[2]]);
        expect(CountryUtils.getCountriesByNameOrCode('+1')).toEqual([mockedCountryDataForTests[0], mockedCountryDataForTests[1]]);
    });

    it('getCountriesByShortCodeOrName returns partial matches', () => {
        expect(CountryUtils.getCountriesByShortCodeOrName('ca')).toEqual([mockedCountryDataForTests[1]]);
        expect(CountryUtils.getCountriesByShortCodeOrName('United')).toEqual([mockedCountryDataForTests[0], mockedCountryDataForTests[2]]);
    });

    it('getCountriesByShortCodeAndName returns exact match', () => {
        expect(CountryUtils.getCountriesByShortCodeAndName('US', 'United States')).toEqual([mockedCountryDataForTests[0]]);
    });

    it('getCountriesByCodeAndName returns exact match', () => {
        expect(CountryUtils.getCountriesByCodeAndName('+1', 'Canada')).toEqual([mockedCountryDataForTests[1]]);
    });

    it('getCountriesByShortCodeAndCode returns exact match', () => {
        expect(CountryUtils.getCountriesByShortCodeAndCode('GB', '+44')).toEqual([mockedCountryDataForTests[2]]);
    });

    it('getCountriesByNameAndCode returns exact match', () => {
        expect(CountryUtils.getCountriesByNameAndCode('Canada', '+1')).toEqual([mockedCountryDataForTests[1]]);
    });

    it('getCountriesByNameAndShortCode returns exact match', () => {
        expect(CountryUtils.getCountriesByNameAndShortCode('United States', 'US')).toEqual([mockedCountryDataForTests[0]]);
    });

    it('getCountriesByShortCodeAndNameOrCode returns matches', () => {
        expect(CountryUtils.getCountriesByShortCodeAndNameOrCode('US', 'United States')).toEqual([mockedCountryDataForTests[0]]);
        expect(CountryUtils.getCountriesByShortCodeAndNameOrCode('CA', '+1')).toEqual([mockedCountryDataForTests[1]]);
    });

    it('getCountriesByCodeAndNameOrShortCode returns matches', () => {
        expect(CountryUtils.getCountriesByCodeAndNameOrShortCode('+44', 'United Kingdom')).toEqual([mockedCountryDataForTests[2]]);
        expect(CountryUtils.getCountriesByCodeAndNameOrShortCode('+1', 'CA')).toEqual([mockedCountryDataForTests[1]]);
    });


    it('isNumberValidLength validates number length', () => {
        expect(CountryUtils.isNumberValidLength('123-456-7890', 10, 10)).toBe(true);
        expect(CountryUtils.isNumberValidLength('123456789', 10, 12)).toBe(false);
        expect(CountryUtils.isNumberValidLength('123456789012', 10, 12)).toBe(true);
        expect(CountryUtils.isNumberValidLength('1234567890123', 10, 12)).toBe(false);
    });
});