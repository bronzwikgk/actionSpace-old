// Query for all available fonts and log metadata.
// const fonts = navigator.fonts.query();
// try {
//   for await (const metadata of fonts) {
//     console.log(`${metadata.family} (${metadata.fullName})`);
//   }
// } catch (err) {
//   console.error(err);
// }




function* createIndex() {
    let number = 1;
    while (true)
        yield number++;
}

function uid() {
    let timmy = Date.now().toString(36).toLocaleUpperCase();
    let randy = parseInt(Math.random() * Number.MAX_SAFE_INTEGER);
    randy = randy.toString(36).slice(0, 12).padStart(12, '0').toLocaleUpperCase();
    return ''.concat(timmy, '-', randy);
}


//console.log("Generate Unique Id's Like these>>>>>", uid(), 'call me at actionHelper.uid');

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//console.log("orLIke this",uuidv4());
//console.log(JSON.stringify({ alpha: 'A', beta: 'B' }, null, '\t'));
// Result:
// '{
//     "alpha": A,
//     "beta": B
// }'
function obj_to_array(arg) {
    return Object.entries(arg).map(([key, value]) => `${key}: ${value}`);
}

function isIn(argA, entity, options) {
    var valuesArray = Object.values(entity)
    var result = Object.values(entity).filter(function (key, index, self) {
      //  console.log(argA,!key.prefix.indexOf(argA), key.prefix)
        if (!key.keyIdentifier.indexOf(argA) === true) {
           // console.log("tentative match found",key)
            if (argA.length === key.keyIdentifier.length) { 
              //  console.log("matchFound", key.prefix)    //To get strict Match To be enabled using options.
                var response = true;
              //  return true;
            }  
        }
        return !key.keyIdentifier.indexOf(argA);
    });
   // console.log("result",result);
    return result;

}


/**
 * AutComplete
 */

class AutoComplete {
    static checkSuggestion(keyword, editor) {
      //  console.log("keyword In testing",keyword,typeof keyword)
        keyword = this.removeSpecialCharacters(keyword.trim());
        if (this._isContains(snippets, keyword)) {

             console.log("editor",editor)
            for (let i = 0; i < snippets.length; ++i) {

                const obj = snippets[i];
                // console.log(obj.prefix+" "+keyword)

                if (obj.prefix === keyword.trim()) {

                   // console.log(editor.innerText.substring(0, editor.innerText.length - keyword.trim().length))

                    console.log("Found",obj.prefix);
                   // Caret.insertInTextarea(obj.body)
                    return true;
                    // this.setCaretToEnd(editor)
                }
            }
        } else {
         //   console.log("Nope");
            return false;
        }
    }
    static uniqueArray(array) {
        const uniqueArray = [...new Set(array)];
    }
    static removeSpecialCharacters(keyword) {
        // console.log(keyword)
        const desired = keyword.replace(/[^\w\s]/gi, '');
        // console.log(desired.trim())
        return desired
    }

    static _isContains(json, value) {
        // console.log(value.trim())
        let contains = false;
        Object.keys(json).some(key => {
            contains = typeof json[key] === 'object' ? this._isContains(json[key], value.trim()) : json[key] === value.trim();
            return contains;
        });
        return contains;
    }

    static setCaretToEnd(target) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(target);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
        target.focus();
        range.detach(); // optimization

        // set scroll to the end if multiline
        target.scrollTop = target.scrollHeight;
    }
}

/*!
 * Group items from an array together by some criteria or value.
 * (c) 2021 Tom Bremmer (https://tbremer.com/) and Chris Ferdinandi (https://gomakethings.com), MIT License,
 * @param  {Array}           arr      The array to group items from
 * @param  {String|Function} criteria The criteria to group by
 * @return {Object}                   The grouped object
 */
function groupBy(arr, criteria) {
    return arr.reduce(function (obj, item) {

        // Check if the criteria is a function to run on the item or a property of it
        let key = typeof criteria === 'function' ? criteria(item) : item[criteria];

        // If the key doesn't exist yet, create it
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
            obj[key] = [];
        }

        // Push the value to the object
        obj[key].push(item);

        // Return the object to the next item in the loop
        return obj;

    }, {});
}


/** 
 * https://www.30secondsofcode.org/js/s/caesar-cipher
 * Encrypts or decrypts a given string using the Caesar cipher.

Use the modulo (%) operator and the ternary operator (?) to calculate the correct encryption/decryption key.
Use the spread operator (...) and Array.prototype.map() to iterate over the letters of the given string.
Use String.prototype.charCodeAt() and String.fromCharCode() to convert each letter appropriately, ignoring special characters, spaces etc.
Use Array.prototype.join() to combine all the letters into a string.
Pass true to the last parameter, decrypt, to decrypt an encrypted string.

 */
const caesarCipher = (str, shift, decrypt = false) => {
    const s = decrypt ? (26 - shift) % 26 : shift;
    const n = s > 0 ? s : 26 + (s % 26);
    return [...str]
        .map((l, i) => {
            const c = str.charCodeAt(i);
            if (c >= 65 && c <= 90)
                return String.fromCharCode(((c - 65 + n) % 26) + 65);
            if (c >= 97 && c <= 122)
                return String.fromCharCode(((c - 97 + n) % 26) + 97);
            return l;
        })
        .join('');
};
Examples
caesarCipher('Hello World!', -3); // 'Ebiil Tloia!'
caesarCipher('Ebiil Tloia!', 23, true); // 'Hello World!'