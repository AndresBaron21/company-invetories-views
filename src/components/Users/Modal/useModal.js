const cleanForm = (props) => {
    const record = props.props.record;
    if (
        props.props.type == 'create' &&
        document.getElementById("firstName") != null &&
        document.getElementById("lastName") != null &&
        document.getElementById("email") != null &&
        document.getElementById("roles") != null &&
        document.getElementById("birthday") != null &&
        document.getElementById("country") != null &&
        document.getElementById("gender") != null &&
        document.getElementById("mobileNumber") != null &&
        document.getElementById("livesIn") != null &&
        document.getElementById("worksAt") != null &&
        document.getElementById("password") != null 
        // document.getElementById("profilePicture") != null &&
        // document.getElementById("coverPhoto") != null 
    ) {
        props.setData({})
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("roles").value = "";
        document.getElementById("birthday").value = "";
        document.getElementById("country").value = "";
        document.getElementById("gender").value = "";
        document.getElementById("mobileNumber").value = "";
        document.getElementById("livesIn").value = "";
        document.getElementById("worksAt").value = "";
        document.getElementById("password").value = "";
        // document.getElementById("profilePicture").value = "";
        // document.getElementById("coverPhoto").value = "";
        // document.getElementById("FirstLogImage").src = "";
        // document.getElementById("SecondLogImage").src = "";
    } else if (
        props.props.type == 'update' &&
        document.getElementById("firstName") != null &&
        document.getElementById("lastName") != null &&
        document.getElementById("email") != null &&
        document.getElementById("roles") != null &&
        document.getElementById("birthday") != null &&
        document.getElementById("country") != null &&
        document.getElementById("gender") != null &&
        document.getElementById("mobileNumber") != null &&
        document.getElementById("livesIn") != null &&
        document.getElementById("worksAt") != null &&
        document.getElementById("password") != null 
        // document.getElementById("profilePicture") != null &&
        // document.getElementById("coverPhoto") != null 
    ) {
        props.setData({})
        document.getElementById("firstName").value = record ? record.first_name : null;
        document.getElementById("lastName").value = record ? record.last_name : null;
        document.getElementById("email").value = record ? record.email : null;
        document.getElementById("roles").value = record ? record.roles : null;
        document.getElementById("birthday").value = record ? record.birthday : null;
        document.getElementById("country").value = record ? record.country : null;
        document.getElementById("gender").value = record ? record.gender : null;
        document.getElementById("mobileNumber").value = record ? record.mobile_number : null;
        document.getElementById("livesIn").value = record ? record.lives_in : null;
        document.getElementById("worksAt").value = record ? record.works_at : null;
        document.getElementById("password").value = null;
        // document.getElementById("profilePicture").value = '';
        // document.getElementById("coverPhoto").value = '';
        // document.getElementById("FirstLogImage").src = "";
        // document.getElementById("SecondLogImage").src = "";
    }
}

export { cleanForm, };