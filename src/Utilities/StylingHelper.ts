export function combineClasses(...classes: string[]): string {
    return classes?.filter((x): boolean => !!x && x.length > 0)?.join(' ');
}
