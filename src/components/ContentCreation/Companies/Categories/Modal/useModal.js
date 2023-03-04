const cleanForm = (props) => {
    const record = props.props.record;
    const companyID = props.props.companyID;
    if (
        props.props.type == 'create' &&
        document.getElementById("name") != null &&
        document.getElementById("companyID") != null
    ) {
        props.setData({})
        document.getElementById("name").value = "";
        document.getElementById("companyID").value = companyID;
    } else if (
        props.props.type == 'update' &&
        document.getElementById("name") != null &&
        document.getElementById("companyID") != null
    ) {
        props.setData({})
        document.getElementById("name").value = record ? record.name : null;
        document.getElementById("companyID").value = record ? record.company_id : null;
    }
}

export { cleanForm, };