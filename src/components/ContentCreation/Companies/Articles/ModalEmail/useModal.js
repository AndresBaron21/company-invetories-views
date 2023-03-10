const cleanForm = (props) => {
    if (
        document.getElementById("senderEmail") != null &&
        document.getElementById("senderPassword") != null &&
        document.getElementById("emailRecipient") != null &&
        document.getElementById("subject") != null &&
        document.getElementById("message") != null 
    ) {
        props.setData({})
        document.getElementById("senderEmail").value = "";
        document.getElementById("senderPassword").value = "";
        document.getElementById("emailRecipient").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("message").value = "";
    } 
}

export { cleanForm, };