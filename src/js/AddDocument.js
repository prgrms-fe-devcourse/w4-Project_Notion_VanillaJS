export default function AddDocument({ target }) {
    if (!(this instanceof AddDocument)) {
        return new AddDocument({ target });
    }

    // *****************************
    // * Valuables and Functions   *
    // *****************************

    const section = document.createElement("section");

    // *****************************
    // * Setting attribute         *
    // *****************************

    section.setAttribute("class", "add_section");
    section.innerHTML = `<button type="button">Add</button>`;

    // *****************************
    // * Function for Rendering    *
    // *****************************

    target.appendChild(section);
}
