export const GetCommitteDay = (dateEntered: Date) => {
    let day = "";

    switch (dateEntered.getDay()) {
        case 1:
            day = "الاثنين"
            break;
        case 2:
            day = "الثلاثاء"
            break;
        case 3:
            day = "الاربعاء"
            break;
        case 4:
            day = "الخميس"
            break;
        case 5:
            day = "الجمعة"
            break;
        case 6:
            day = "السبت"
            break;
        case 0:
            day = "الاحد"
            break;
        default: day = "";
    }

    return day
}


export const GetCommiteDate = (dateEntered: number) => {
    let day = "";

    switch (dateEntered) {
        case 1:
            day = "السبت"
            break;
        case 2:
            day = "الاحد"
            break;
        case 3:
            day = "الاثنين"
            break;
        case 4:
            day = "الثلاثاء"
            break;
        case 5:
            day = "الاربعاء"
            break;
        case 6:
            day = "الخميس"
            break;
        case 7:
            day = "الجمعة"
            break;
    }

    console.log(day);
    return day
}