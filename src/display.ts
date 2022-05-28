export type Colors = {
    bg: string,
    on: string,
    off: string,
    gaps: string,
}

const glyph: Record<string, string> = {
    '0': 'abcdef',
    '1': 'bc',
    '2': 'abged',
    '3': 'abgcd',
    '4': 'fgbc',
    '5': 'afgcd',
    '6': 'afedcg',
    '7': 'abc',
    '8': 'afgcdeb',
    '9': 'afgbc',
};

function mapString<T>(s: string, f: (s: string, i: number) => T): Array<T> {
    const result = [];
    let i = 0;
    for (const c of s.split("")) {
        result.push(f(c, i++));
    }
    return result;
};

export function svg(text: string, colors: Colors): string {
    return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 ${12 * text.length} 20">
<rect x="-1" y="-1" width="${12 * text.length}" height="20" fill="${colors.bg}" />
${mapString(text, (c, i) => segments(glyph[c] || 'd', i, colors)).join()}
</svg>`;
}

function segments(on: string, column: number, colors: Colors): string {
    function fill(segment: string): string {
        if (on.includes(segment)) {
            return colors.on;
        }
        return colors.off;
    };
    function stroke(segment: string): string {
        if (on.includes(segment)) {
            return colors.gaps;
        }
        return colors.off;
    };
    const style = `fill-rule:evenodd; stroke-width:0.25; stroke-opacity:1; stroke-linecap:butt; stroke-linejoin:miter;`;
    const transform = `translate(${12 * column})`;
    // public domain code from https://commons.wikimedia.org/wiki/File:7-segment_abcdefg.svg
    return `<g id="abcdefg" style="${style}" transform="${transform}">
<polygon id="a" points=" 1, 1  2, 0  8, 0  9, 1  8, 2  2, 2" fill="${fill('a')}" stroke="${stroke('a')}"/>
<polygon id="b" points=" 9, 1 10, 2 10, 8  9, 9  8, 8  8, 2" fill="${fill('b')}" stroke="${stroke('b')}"/>
<polygon id="c" points=" 9, 9 10,10 10,16  9,17  8,16  8,10" fill="${fill('c')}" stroke="${stroke('c')}"/>
<polygon id="d" points=" 9,17  8,18  2,18  1,17  2,16  8,16" fill="${fill('d')}" stroke="${stroke('d')}"/>
<polygon id="e" points=" 1,17  0,16  0,10  1, 9  2,10  2,16" fill="${fill('e')}" stroke="${stroke('e')}"/>
<polygon id="f" points=" 1, 9  0, 8  0, 2  1, 1  2, 2  2, 8" fill="${fill('f')}" stroke="${stroke('f')}"/>
<polygon id="g" points=" 1, 9  2, 8  8, 8  9, 9  8,10  2,10" fill="${fill('g')}" stroke="${stroke('g')}"/>
</g>`;
}
