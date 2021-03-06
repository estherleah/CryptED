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


export const atbash = (plaintext) => {
    // output
    var ciphertext = "";

    // forwards and backwards alphabet strings
    const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
    const REVERSE = "zyxwvutsrqponmlkjihgfedcba";

    // go through plaintext one character at a time
    for (var i = 0; i < plaintext.length; i++) {
        var c = plaintext[i];
        // check if it is a letter
        if (c.match(/[a-z]/i)) {
            // get unicode value
            var unicode = plaintext.charCodeAt(i);
            // uppercase
            if ((unicode >= 65) && (unicode <= 90)) {
                // find position within alphabet and set c to same position in reverse string
                c = REVERSE.charAt(ALPHABET.toUpperCase().indexOf(c)).toUpperCase();
            }
            // lowercase
            else if ((unicode >= 97) && (unicode <= 122)) {
                // find position within alphabet and set c to same position in reverse string
                c = REVERSE.charAt(ALPHABET.indexOf(c));
            }
        }
        // append to ciphertext
        ciphertext += c;
    }
    return ciphertext;
}


export const vigenere = (plaintext, key) => {
    // output
    var ciphertext = "";

    // go through plaintext one character at a time
    for (var i = 0, j = 0; i < plaintext.length; i++) {
        var c = plaintext[i];
        // check if it is a letter
        if (c.match(/[a-z]/i)) {
            // get unicode value
            var unicode = plaintext.charCodeAt(i);
            // uppercase
            if ((unicode >= 65) && (unicode <= 90)) {
                c = String.fromCharCode(((unicode - 65 + (key.toLowerCase().charCodeAt(j) - 97)) % 26) + 65);
            }
            // lowercase
            else if ((unicode >= 97) && (unicode <= 122)) {
                c = String.fromCharCode(((unicode - 97 + (key.toLowerCase().charCodeAt(j) - 97)) % 26) + 97);
            }
            // increment j - position in key
            j = (j + 1) % key.length;
        }
        // append to ciphertext
        ciphertext += c;
    }
    return ciphertext;
}


export const keyword = (plaintext, key) => {
    // output
    var ciphertext = "";

    // alphabet and cipherbet strings
    const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
    const CIPHERBET = getCipherbet(key);

    // go through plaintext one character at a time
    for (var i = 0; i < plaintext.length; i++) {
        var c = plaintext[i];
        // check if it is a letter
        if (c.match(/[a-z]/i)) {
            // get unicode value
            var unicode = plaintext.charCodeAt(i);
            // uppercase
            if ((unicode >= 65) && (unicode <= 90)) {
                // find position within alphabet and set c to same position in reverse string
                c = CIPHERBET.charAt(ALPHABET.toUpperCase().indexOf(c)).toUpperCase();
            }
            // lowercase
            else if ((unicode >= 97) && (unicode <= 122)) {
                // find position within alphabet and set c to same position in reverse string
                c = CIPHERBET.charAt(ALPHABET.indexOf(c));
            }
        }
        // append to ciphertext
        ciphertext += c;
    }
    return ciphertext;
}

// helper function to return the cipherbet required by the keyword cipher
function getCipherbet(key) {
	// output
    var cipherbet = "";
    
	const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
	// go through keyword one letter at a time
	for (var i = 0; i < key.length; i++) {
		var c = key[i];
		// check if letter
		if (c.match(/[a-z]/i)) {
			// if not already in included, append to cipherbet
			if (!cipherbet.includes(c)) {
				cipherbet += c;
			}
		}
	}
	// go through alphabet one letter at a time
	for (var j = 0; j < ALPHABET.length; j++) {
		var c = ALPHABET[j];
		// if not already in included, append to cipherbet
		if (!cipherbet.includes(c)) {
			cipherbet += c;
		}
	}
	return cipherbet;
}