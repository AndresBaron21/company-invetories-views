const cleanForm = (props) => {
    const record = props.props.record;
    if (
        props.props.type == 'update' &&
        document.getElementById("bookingEndDates") != null
    ) {
        props.setData({})
        document.getElementById("bookingEndDates").value = record ? record.booking_end_dates : null;
    }
}

export { cleanForm, };