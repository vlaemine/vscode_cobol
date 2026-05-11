
export class SplitTokenizer {

    private static readonly wordSeparators = new Set(
        "~!@$%^&*()=+[{]}\\|;,<>/?".split("")
    );

    public static splitArgument(input: string, ret: string[]): void {
        let inQuote = false;
        let inQuoteSingle = false;
        let inDoubleEquals = false;
        const lineLength = input.length;
        const currentArgument: string[] = [];

        for (let i = 0; i < lineLength; i++) {
            const c = input.charAt(i);

            /* handle quotes */
            if (c === "'" && !inQuote) {
                inQuoteSingle = !inQuoteSingle;
                currentArgument.push(c);
                if (!inQuoteSingle) {
                    ret.push(currentArgument.join(""));
                    currentArgument.length = 0;
                }
                continue;
            }

            if (c === "\"" && !inQuoteSingle) {
                inQuote = !inQuote;
                currentArgument.push(c);
                if (!inQuote) {
                    ret.push(currentArgument.join(""));
                    currentArgument.length = 0;
                }
                continue;
            }

            if (c === "=") {
                // double ==
                if (1 + i < lineLength && input.charAt(1 + i) === "=") {
                    currentArgument.push("==");
                    inDoubleEquals = !inDoubleEquals;
                    i++;
                    continue;
                }
                if (currentArgument.length !== 0) {
                    ret.push(currentArgument.join(""));
                    currentArgument.length = 0;
                }
                // single =
                ret.push("=");
                currentArgument.length = 0;
                continue;
            }

            // include all items in string
            if (inQuote || inQuoteSingle || inDoubleEquals) {
                currentArgument.push(c);
                continue;
            }

            /* skip white space */
            if ((c === " ") || (c === "\t")) {
                if (currentArgument.length !== 0) {
                    ret.push(currentArgument.join(""));
                    currentArgument.length = 0;
                }
                while (1 + i < lineLength && (input.charAt(1 + i) === " " || input.charAt(1 + i) === "\t")) {
                    i++;
                }
                continue;
            }


            // handle : or ::
            if (c === ":") {
                if (currentArgument.length !== 0) {
                    ret.push(currentArgument.join(""));
                    currentArgument.length = 0;
                }

                // double ::
                if (1 + i < lineLength && input.charAt(1 + i) === ":") {
                    ret.push("::");
                    i++;
                    continue;
                }

                // single :
                ret.push(":");
                currentArgument.length = 0;
                continue;
            }

            if (SplitTokenizer.wordSeparators.has(c)) {
                if (currentArgument.length !== 0) {
                    ret.push(currentArgument.join(""));
                    currentArgument.length = 0;
                }
                ret.push(c);
                continue;
            }

            currentArgument.push(c);
        }

        if (currentArgument.length !== 0) {
            ret.push(currentArgument.join(""));
        }
    }
}