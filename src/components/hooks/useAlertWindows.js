import swal from 'sweetalert';

const plainAlert = (props) => {
    swal({
        title: props.title,
        text: props.text,
        icon: props.icon,
    });
}

const confirmationAlert = (props) => {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this record",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                props.deleteRecord(props)
            } else {
                swal("Your record is safe");
            }
        });
}

const deleteConfirmationAlert = ({
    row,
    setUpdateDataTable,
    updateDataTable,
    newRecord,
}) => {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this record",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                newRecord({
                    row,
                    setUpdateDataTable,
                    updateDataTable,
                })
            } else {
                swal("Your record is safe");
            }
        });
}

export { plainAlert, confirmationAlert, deleteConfirmationAlert };
