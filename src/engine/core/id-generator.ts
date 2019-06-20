export class IDGenerator {
    public static generate(length: number = 6) {
        var text = "";
        var headChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var possible = headChars + "0123456789";

        for (var i = 0; i < 2; ++i) {
            text += headChars.charAt(
                Math.floor(Math.random() * headChars.length)
            );
        }

        for (var i = 0; i < length; i++) {
            text += possible.charAt(
                Math.floor(Math.random() * possible.length)
            );
        }

        // console.log("ID Sequence generated: " + text);

        return text;
    }
}
