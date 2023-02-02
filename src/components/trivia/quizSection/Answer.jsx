export default function Answer(props) {

    let bColor;

    if (props.isSelected) { bColor = "#AA5656"; } else { bColor = "#B99B6B"; }

    if (props.isCorrect && props.isOver) { bColor = "#1F8A70"; }

    const styles = { backgroundColor: bColor }

    return (
        <p
            onClick={() => props.select(props.id)}
            style={styles}
            className="answerText"
            id={props.id}
        >
            {props.answer}
        </p>
    );
}