import styles from "./Loader.module.css"

const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.cir}></div>
            <div className={styles.cir}></div>
            <div className={styles.cir}></div>
            <div className={styles.cir}></div>
            <div className={styles.cir}></div>
        </div>
    )
}

export default Loader