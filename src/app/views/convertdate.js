import moment from "moment";

export function convertdate(date) {     
    return  moment(date).locale("fr").format("DD MMMM YYYY HH:mm");
}

export default convertdate;