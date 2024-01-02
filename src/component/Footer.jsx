import ReactDom from "react-dom";

let year = new Date().getFullYear();

function Footer(){
    return (<footer>
        <p>copyright © {year}</p>
    </footer>
    );
}

export default Footer;