/* eslint-disable @next/next/no-img-element */
export default function Message({ children, avatar, username, description, timestamp }) {


    Date.prototype.toShortFormat = function () {
        const monthNames = ["Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug",
            "Sep", "Oct", "Nov", "Dec"];

        const day = this.getDate();

        const monthIndex = this.getMonth();
        const monthName = monthNames[monthIndex];

        const year = this.getFullYear();

        return `${day}-${monthName}-${year}`;
    }

    let fireBaseTime;
    var currDate;
    var atTime;
    if (timestamp) {
        fireBaseTime = new Date(
            timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000,
        );
        currDate = fireBaseTime.toDateString();
        atTime = fireBaseTime.toLocaleTimeString();
    } else {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        // currDate=
        // atTime=
    }



    return (
        <div className="bg-white p-8 rounded-lg border-1 shadow-sm my-5 mx-4 dark:bg-slate-700 dark:text-white">
            <div className="flex items-center gap-2">
                <img class="rounded-full w-10" src={avatar} alt="" />
                <h2 className="font-bold">{username}</h2>
            </div>
            <div>
                <p>{description}</p>
            </div>
            <div className="gap-5 text-gray-300 text-sm pt-4">
                <p>{atTime} {currDate}</p>
            </div>
            {children}
        </div>
    );
}