<template>
    <div class="container">
        <h1>Takvim</h1>
        <div class="info-switch">
            <h2>{{currentMonthName}} / {{shownYear}}</h2>
            <div class="switch">
                <button @click="prevMonth">&lt; Prev</button>
                <button @click="nextMonth">Next &gt;</button>
            </div>
        </div>
        <section class="days">
            <div class="day" v-for="day in days" :key="day">
                <p>{{day}}</p>
            </div>
        </section>
        <section class="days">
            <div class="day" v-for="gap in gapOfFirstWeek(shownMonth, shownYear)" :key="gap">
                <p>{{day}}</p>
            </div>
            <div class="day text-white" v-for="day in daysInMonth(shownMonth, shownYear)" :key="day" :class="{'bg-green': checkIfToday(new Date(), day), 'bg-black': !checkIfToday(new Date(), day)}">
                <p>{{day}}</p>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    computed: {
        currentDate : {
            get(){
                let date = [];
                let dateNow = new Date();
                date.push(dateNow.getFullYear());
                date.push(dateNow.getMonth());
                date.push(dateNow.getDate());
                return date;
            }
        },
        currentMonthName(){
            return new Date(this.shownYear, this.shownMonth).toLocaleString('default', {month: 'long'});
        },
    },
    data(){
        return {
            days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            shownMonth: new Date().getMonth(),
            shownYear: new Date().getFullYear(),
            monthName: new Date().toLocaleString('default', {month: 'long'})
        }     
    },
    methods : {
        daysInMonth(month, year){
            console.log(month);
            console.log(year);
            return new Date(year, month + 1, 0).getDate();
        },
        gapOfFirstWeek(month, year){
            let date = new Date(year, month, 1).getDay();
            return date;
        },
        checkIfToday(date, day){
            let checkYears = date.getFullYear() == this.shownYear;
            let checkMonths = date.getMonth() == this.shownMonth;
            let checkDays = day == this.currentDate[2];
            // console.log(day);
            // console.log(this.currentDate);
            // console.log(checkDays, checkMonths, checkYears)
            return checkYears && checkMonths && checkDays;
        },
        prevMonth(){
            if(this.shownMonth == 0){
                this.shownMonth = 11;
                this.shownYear--;
            }
            else{
                this.shownMonth--;
            }
            this.currentMonthName();
        },
        nextMonth(){
            if(this.shownMonth == 11){
                this.shownMonth = 0;
                this.shownYear++;
            }
            else{
                this.shownMonth++;
            }
            this.currentMonthName();
        },
    }
}

</script>

<style scoped>

    h1 {
        text-align: center;
    }

    .info-switch {
        display: flex;
        justify-content: space-between;
    }

    .switch {
        display: flex;
        gap: 1em;
    }

    .switch button {
        background: transparent;
        border: none;
        outline: none;
        background: #111;
        color: #fff;
    }

    .switch button:hover {
        background: #555;
        color: #fff;
    }

    .days {
        display: flex;
        margin-top: 1em;
        flex-wrap: wrap;
    }

    .day {
        width: 14.28%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.2em;
        border: #fff 0.1em solid;
    }

    .day p {
        margin: 0;
        padding: 0;
        font-size: 1.8em;
    }

    .bg-green {
        background: #030;
    }

    .bg-green:hover {
        background: #050;
        cursor: pointer;
    }

    .bg-black {
        background: #000;
    }

    .bg-black:hover {
        background: #333;
        cursor: pointer;
    }

    .text-white {
        color: #fff;
    }

</style>