const cleanForm = (props) => {
    const record = props.props.record;
    if (
        props.props.type == 'update' &&
        document.getElementById("name") != null &&
        document.getElementById("email") != null &&
        document.getElementById("ProfilePicture") != null
    ) {
        props.setData({})
        document.getElementById("name").value = record ? record.name : null;
        document.getElementById("email").value = record ? record.email : null;
        document.getElementById("ProfilePicture").value = "";
        document.getElementById("SecondLogImage").src = "";
    }
}

export { cleanForm, };