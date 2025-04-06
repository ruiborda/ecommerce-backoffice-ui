export enum WindowInnerWidthSize {
    xs = 0,
    sm = 640,
    md = 768,
    lg = 1024,
    xl = 1280,
    xxl = 1536,
}

export class WindowInnerWidth {
    public innerWidth: number

    constructor(width: number) {
        this.innerWidth = width
    }

    static getSizeFromWidth(width: number): WindowInnerWidthSize {
        if (width >= WindowInnerWidthSize.xxl) {
            return WindowInnerWidthSize.xxl
        } else if (width >= WindowInnerWidthSize.xl) {
            return WindowInnerWidthSize.xl
        } else if (width >= WindowInnerWidthSize.lg) {
            return WindowInnerWidthSize.lg
        } else if (width >= WindowInnerWidthSize.md) {
            return WindowInnerWidthSize.md
        } else if (width >= WindowInnerWidthSize.sm) {
            return WindowInnerWidthSize.sm
        } else {
            return WindowInnerWidthSize.xs
        }
    }


    public isGreaterThanOrEqualTo(size: WindowInnerWidthSize): boolean {
        return this.innerWidth >= size
    }

    public isGreaterThanTo(size: WindowInnerWidthSize): boolean {
        return this.innerWidth > size
    }

    public isBetween(size1: WindowInnerWidthSize, size2: WindowInnerWidthSize): boolean {
        return this.innerWidth >= size1 && this.innerWidth <= size2
    }

    public isLessThan(size: WindowInnerWidthSize): boolean {
        return this.innerWidth < size
    }

    public isLessThanOrEqual(size: WindowInnerWidthSize): boolean {
        return this.innerWidth <= size
    }

    public isEqualTo(size: WindowInnerWidthSize): boolean {
        return this.innerWidth === size
    }

    public isNotEqualTo(size: WindowInnerWidthSize): boolean {
        return this.innerWidth !== size
    }
}

