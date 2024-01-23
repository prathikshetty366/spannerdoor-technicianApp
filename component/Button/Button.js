
import style from "./Button.module.scss"

function Button(props) {
    const { onClick,text,styles } = props

    return (
        <div className={style.button} onClick={onClick} style={styles}>
        {text}
        </div>
    )
}

export default Button