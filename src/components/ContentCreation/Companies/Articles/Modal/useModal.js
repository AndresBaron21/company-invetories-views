const cleanForm = (props) => {
    const record = props.props.record;
    const companyID = props.props.companyID;
    if (
        props.props.type == 'create' &&
        document.getElementById("name") != null &&
        document.getElementById("description") != null 
    ) {
        props.setData({})
        document.getElementById("name").value = "";
        document.getElementById("description").value = "";
    } else if (
        props.props.type == 'update' &&
        document.getElementById("name") != null &&
        document.getElementById("description") != null 
    ) {
        props.setData({})
        document.getElementById("name").value = record ? record.name : null;
        document.getElementById("description").value = record ? record.description : null;
    }
}

export { cleanForm, };