import { FunctionComponent } from "react";
import styles from "../styles/footer.module.css";
import { Link } from "@nextui-org/react";

const Footer: FunctionComponent = () => {
    return (
        <footer id={styles.footer}>
        <h2 className={styles.text}>Web made by <Link href="https://github.com/PiterWeb">PiterDev</Link></h2>
        </footer>
    );
}

export default Footer;