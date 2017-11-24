
import {
    goesDeeper, goesElse, goesHigher, goesSame,
    goesToSibling
} from '../utils';

describe('transition utils', () => {

    it('`goesDeeper` works', () => {

        // equal
        expect(goesDeeper('/a', '/a')).toBeFalsy();

        // sibling
        expect(goesDeeper('/a/b', '/a/c')).toBeFalsy();
        expect(goesDeeper('/a', '/b')).toBeFalsy(); // root sibling

        // deeper
        expect(goesDeeper('/a', '/a/b')).toBeTruthy();
        expect(goesDeeper('/a', '/a/b/c')).toBeTruthy();
        expect(goesDeeper('/a/b', '/a/b/c/d')).toBeTruthy();

        // higher
        expect(goesDeeper('/a/b', '/a')).toBeFalsy();
        expect(goesDeeper('/a/b/c', '/a/b')).toBeFalsy();
        expect(goesDeeper('/a/b/c', '/a')).toBeFalsy();

        // different
        expect(goesDeeper('/a/b', '/c/d')).toBeFalsy();

    });

    it('`goesHigher` works', () => {

        // equal
        expect(goesHigher('/a', '/a')).toBeFalsy();

        // sibling
        expect(goesHigher('/a/b', '/a/c')).toBeFalsy();
        expect(goesHigher('/a', '/b')).toBeFalsy(); // root sibling

        // deeper
        expect(goesHigher('/a', '/a/b')).toBeFalsy();
        expect(goesHigher('/a', '/a/b/c')).toBeFalsy();
        expect(goesHigher('/a/b', '/a/b/c/d')).toBeFalsy();

        // higher
        expect(goesHigher('/a/b', '/a')).toBeTruthy();
        expect(goesHigher('/a/b/c', '/a/b')).toBeTruthy();
        expect(goesHigher('/a/b/c', '/a')).toBeTruthy();

        // different
        expect(goesHigher('/a/b', '/c/d')).toBeFalsy();

    });

    it('`goesToSibling` works', () => {

        // equal
        expect(goesToSibling('/a', '/a')).toBeFalsy();

        // sibling
        expect(goesToSibling('/a/b', '/a/c')).toBeTruthy();
        expect(goesToSibling('/a', '/b')).toBeTruthy(); // root sibling

        // deeper
        expect(goesToSibling('/a', '/a/b')).toBeFalsy();
        expect(goesToSibling('/a', '/a/b/c')).toBeFalsy();
        expect(goesToSibling('/a/b', '/a/b/c/d')).toBeFalsy();

        // higher
        expect(goesToSibling('/a/b', '/a')).toBeFalsy();
        expect(goesToSibling('/a/b/c', '/a/b')).toBeFalsy();
        expect(goesToSibling('/a/b/c', '/a')).toBeFalsy();

        // different
        expect(goesToSibling('/a/b', '/c/d')).toBeFalsy();

    });

    it('`goesElse` works', () => {

        // equal
        expect(goesElse('/a', '/a')).toBeFalsy();

        // sibling
        expect(goesElse('/a/b', '/a/c')).toBeFalsy();
        expect(goesElse('/a', '/b')).toBeFalsy(); // root sibling

        // deeper
        expect(goesElse('/a', '/a/b')).toBeFalsy();
        expect(goesElse('/a', '/a/b/c')).toBeFalsy();
        expect(goesElse('/a/b', '/a/b/c/d')).toBeFalsy();

        // higher
        expect(goesElse('/a/b', '/a')).toBeFalsy();
        expect(goesElse('/a/b/c', '/a/b')).toBeFalsy();
        expect(goesElse('/a/b/c', '/a')).toBeFalsy();

        // different
        expect(goesElse('/a/b', '/c/d')).toBeTruthy();

    });

    it('`goesSame` works', () => {

        // equal
        expect(goesSame('/a', '/a')).toBeTruthy();

        // sibling
        expect(goesSame('/a/b', '/a/c')).toBeFalsy();
        expect(goesSame('/a', '/b')).toBeFalsy(); // root sibling

        // deeper
        expect(goesSame('/a', '/a/b')).toBeFalsy();
        expect(goesSame('/a', '/a/b/c')).toBeFalsy();
        expect(goesSame('/a/b', '/a/b/c/d')).toBeFalsy();

        // higher
        expect(goesSame('/a/b', '/a')).toBeFalsy();
        expect(goesSame('/a/b/c', '/a/b')).toBeFalsy();
        expect(goesSame('/a/b/c', '/a')).toBeFalsy();

        // different
        expect(goesSame('/a/b', '/c/d')).toBeFalsy();

    });
});