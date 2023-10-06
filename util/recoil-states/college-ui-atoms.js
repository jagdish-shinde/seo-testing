import {atom} from 'recoil'
import { SLUG_PAGES } from '../constants';

export const isCollegeDataAvailable = atom({
    key: 'isCollege',
    default: false
});
export const currentSlugPageAtom = atom({
    key: 'currentSlugPageAtom',
    default: SLUG_PAGES.college
});