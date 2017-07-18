export const caesar = (plaintext) => {
    // output
    var ciphertext = "";

    // pick random number between 1 and 25 as the shift value
    var shift = Math.floor((Math.random() * 25) + 1);

    // go through plaintext one character at a time
    for (var i = 0; i < plaintext.length; i++) {
        var c = plaintext[i];
        // check if it is a letter
        if (c.match(/[a-z]/i)) {
            // get unicode value
            var unicode = plaintext.charCodeAt(i);
            // uppercase
            if ((unicode >= 65) && (unicode <= 90)) {
                c = String.fromCharCode(((unicode - 65 + shift) % 26) + 65);
            }
            // lowercase
            else if ((unicode >= 97) && (unicode <= 122)) {
                c = String.fromCharCode(((unicode - 97 + shift) % 26) + 97);
            }
        }
        // append to ciphertext
        ciphertext += c;
    }
    return ciphertext;
}
