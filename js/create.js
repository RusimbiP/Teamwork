/**
 * bold, Italic and Underline buttons
 */
let bold = document.getElementById( "bold" );
let italic = document.getElementById( "italic" );
let underline = document.getElementById( "underline" );
/**
 *Justify Left, Center and Right
 * @param {*} _ 
 */
const justifyLeft =_=> document.execCommand( "justifyLeft" );
const justifyCenter =_=> document.execCommand( "justifyCenter" );
const justifyRight =_=> document.execCommand( "justifyRight" );
/**
 * Make Bold
 */
const makeBold =_=> {
  document.execCommand( "bold" );
  if ( bold.isToggled ) {
    bold.style.backgroundColor = "#00cc55";
    bold.isToggled = false;
  } else {
    bold.style.backgroundColor = "#008833";
    bold.isToggled = true;
  }
}
/**
 * Make Italic
 * @param {*} _ 
 */
const makeItalic =_=> {
  document.execCommand( "italic" );
   if ( italic.isToggled ) {
    italic.style.backgroundColor = "#00cc55";
    italic.isToggled = false;
  } else {
    italic.style.backgroundColor = "#008833";
    italic.isToggled = true;
  }
}
/**
 * Underline
 * @param {*} _ 
 */
const doUnderline =_=> {
  document.execCommand( "underline" );
   if ( underline.isToggled ) {
    underline.style.backgroundColor = "#00cc55";
    underline.isToggled = false;
  } else {
    underline.style.backgroundColor = "#008833";
    underline.isToggled = true;
  }
}
/**
 * Add image
 * @param {*} _ 
 */
const doAddImage =_=> {
  let image_url = prompt( "Image URL:" );
  if(image_url != "") {
    document.execCommand( "insertImage", false, image_url);
  } else {
    alert( "You must set a URL!" );
  }
}


