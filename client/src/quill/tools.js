import ReactQuill, { Quill } from "react-quill";
var icons = ReactQuill.Quill.import("ui/icons");
const Font = Quill.import("formats/font");
import ImageCompress from "quill-image-compress";
Quill.register("modules/imageCompress", ImageCompress);

icons["undo"] = "UNDO";
icons["redo"] = "REDO";

var icons = Quill.import("ui/icons");
icons["undo"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
    <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
  </svg>`;
icons["redo"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
    <path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
  </svg>`;

Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);

const theme = "snow";
const placeholder = "Compose an epic...";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  // [{ script: "sub" }, { script: "super" }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ direction: "rtl" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ font: [] }],
  [{ align: [] }],
  ["image", "video", "link"],
  ["code-block"],
  ["clean"],
  ["undo"],
  ["redo"],
];
 
//$ React-quill
 const modulesTool = {
   toolbar: {
     container: [
       [{ header: [1, 2, 3, 4, 5, 6, false] }],
       [{ list: "ordered" }, { list: "bullet" }],
       ["bold", "italic", "underline", "strike"],
       [{ color: [] }, { background: [] }],
       // [{ script: "sub" }, { script: "super" }],
       [{ list: "ordered" }, { list: "bullet" }],
       [{ direction: "rtl" }],
       [{ indent: "-1" }, { indent: "+1" }],
       [{ font: [] }],
       [{ align: [] }],
       ["image", "video", "link"],
       ["code-block"],
       ["clean"],
       ["undo"],
       ["redo"],
     ],
     handlers: {
       undo: Undo,
       redo: Redo,
     },
   },
 };


const formats = [
  "font",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "list",
  "indent",
  "size",
  "header",
  "link",
  "image",
  "video",
  "color",
  "background",
  "code-block",
  "clean",
  "undo",
  "redo",
];

function Link(value) {
  if (value) {
    var href = prompt("Enter the URL");
    this.quill.format("link", href);
  } else {
    this.quill.format("link", false);
  }
}

function Undo() {
  this.quill.history.undo();
}

function Redo() {
  this.quill.history.redo();
}

const modules = {
  history: {
    delay: 1000,
    maxStack: 100,
    userOnly: false,
  },

  toolbar: {
    container: TOOLBAR_OPTIONS,
    handlers: {
      undo: Undo,
      redo: Redo,
      link: Link,
    },
  },


 
  imageCompress: {
    quality: 0.7,
    maxWidth: 550,
    maxHeight: 550,
    // imageType: "image/jpeg",
    debug: true,
    suppressErrorLogging: false,
    insertIntoEditor: undefined,
  },
};

export {
  TOOLBAR_OPTIONS,
  formats,
  theme,
  placeholder,
  modules,
  Link,
  Undo,
  Redo,
  modulesTool,
};

