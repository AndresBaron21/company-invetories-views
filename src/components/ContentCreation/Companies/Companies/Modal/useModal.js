const cleanForm = (props) => {
    const record = props.props.record;
    if (
        props.props.type == 'create' &&
        document.getElementById("tin") != null &&
        document.getElementById("name") != null &&
        document.getElementById("address") != null &&
        document.getElementById("phone") != null 
    ) {
        props.setData({})
        document.getElementById("tin").value = "";
        document.getElementById("name").value = "";
        document.getElementById("address").value = "";
        document.getElementById("phone").value = "";
    } else if (
        props.props.type == 'update' &&
        document.getElementById("tin") != null &&
        document.getElementById("name") != null &&
        document.getElementById("address") != null &&
        document.getElementById("phone") != null 
    ) {
        props.setData({})
        document.getElementById("tin").value = record ? record.tin : null;
        document.getElementById("name").value = record ? record.name : null;
        document.getElementById("address").value = record ? record.address : null;
        document.getElementById("phone").value = record ? record.phone : null;
    }
}

export { cleanForm, };